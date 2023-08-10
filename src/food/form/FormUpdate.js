import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import storage from '../../config/FirebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Food } from '../../model/Food';

const getCategory = async () => {
    return await axios.get(`http://localhost:8080/api/category`);
};

export default function FormCreate(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const idUser = user.id;
    const [shopChose, setShopChose] = useState('');
    const [shop, setShop] = useState([]);
    const [nameProducts, setNameProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoryChose, setCategoryChose] = useState([]);
    const [file, setFile] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getCategory().then((res) => {
            setCategory(res.data);
        });
        axios.get('http://localhost:8080/api/products').then((res) => {
            setNameProducts(res.data);
        });
        axios.get(`http://localhost:8080/api/shops/user/${idUser}`).then((response) => {
            setShop(response.data);
        });
    }, [idUser]);

    const validation = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Độ dài không hợp lệ')
            .max(500, 'Độ dài không hợp lệ')
            .required('Hãy nhập dữ liệu!'),

        description: Yup.string().min(2, 'Độ dài không hợp lệ').required('Hãy nhập dữ liệu!'),
        quantity: Yup.number().min(0, 'Độ dài không hợp lệ').required('Hãy nhập dữ liệu!'),
        price: Yup.number().min(0, 'Độ dài không hợp lệ').required('Hãy nhập dữ liệu!'),
    });

    const handleChange = (event) => {
        setShopChose(event.target.value);
    };

    const checkNameProduct = (name) => {
        return nameProducts.some((products) => products.name === name);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            quantity: 0,
            price: 0,
        },
        validationSchema: validation,
        onSubmit: (values) => {
            let data = { ...values };
            if (file) {
                const time = new Date().getTime();
                const nameFile = time + '-' + file.name;
                const storageRef = ref(storage, `image/${nameFile}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {},
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            data.image = downloadURL;
                            data.categories = categoryChose;
                            data.shops = {
                                id: shopChose,
                            };
                            data.id = props.food.id;
                            axios
                                .post(`http://localhost:8080/api/products`, data)
                                .then((res) => {
                                    navigate('/');
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                });
                        });
                    }
                );
            } else {
                data.image = props.food.image;
                data.categories = categoryChose;
                data.shops = {
                    id: shopChose,
                };
                data.id = props.food.id;
                axios
                    .post(`http://localhost:8080/api/products`, data)
                    .then((res) => {
                        navigate('/');
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
        },
    });


    useEffect(() => {
        // Lấy dữ liệu của sản phẩm và đẩy vào initialValues
        if (props.food) {
            const { name, description, quantity, price, categories } = props.food;
            formik.setValues({
                name: name,
                description: description,
                quantity: quantity,
                price: price,
            });
            if (categories) {
                setCategoryChose(categories.map((category) => ({ id: category.id })));
            } else {
                setCategoryChose([]);
            }
            setShopChose(props.food.shops ? props.food.shops.id : '');
        }
    }, [props.food]);

    const choseCategory = (e) => {
        let id = +e.target.value;
        let category = categoryChose?.filter((item) => item.id === id);
        if (category.length > 0) {
            let data = categoryChose.filter((item) => item.id !== id);
            setCategoryChose([...data]);
        } else {
            setCategoryChose([...categoryChose, { id: id }]);
        }
    };

    const choseFileUpload = (e) => {
        const img = e.target.files[0];
        setFile(img);
    };


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className={'row'}>
                    <div className="title-form-container">
                        <h1 className="title-form">Cập nhật món ăn</h1>
                    </div>
                    <div className={'col-md-6'}>
                        <FormControl sx={{ m: 1, minWidth: 80, marginLeft: 0, display: `none` }}>
                            {/*<InputLabel id="demo-simple-select-autowidth-label">Cửa hàng</InputLabel>*/}
                            <label htmlFor={''}  className={'form-label'}>Cửa hàng</label>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={shopChose}
                                onChange={handleChange}
                                className="form-control-select"
                                autoWidth
                                // label="Shop"
                            >
                                {shop.map((shop) => (
                                    <MenuItem key={shop.id} value={shop.id}>
                                        {shop.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="mb-3">
                            <label htmlFor={'outlined-basic'} className={'form-label'}>Tên món ăn</label>
                            <TextField
                                onChange={formik.handleChange}
                                error={formik.errors.name && formik.touched.name}
                                fullWidth
                                id="outlined-basic"
                                name="name"
                                className="form-control"
                                // label="Nhập tên sản phẩm"
                                variant="outlined"
                                value={formik.values.name}
                                helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={''} className={'form-label'}>Mô tả món ăn</label>
                            <TextField
                                onChange={formik.handleChange}
                                error={formik.errors.description && formik.touched.description}
                                fullWidth
                                id="outlined-basic"
                                className="form-control"
                                name="description"
                                // label="Nhập mô tả sản phẩm"
                                variant="outlined"
                                value={formik.values.description}
                                helperText={formik.errors.description && formik.touched.description ? formik.errors.description : ''}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={''} className={'form-label'}>Số lượng</label>
                            <TextField
                                onChange={formik.handleChange}
                                error={formik.errors.quantity && formik.touched.quantity}
                                fullWidth
                                id="outlined-basic"
                                name="quantity"
                                className="form-control"
                                // label="Nhập số lượng sản phẩm"
                                variant="outlined"
                                value={formik.values.quantity}
                                helperText={formik.errors.quantity && formik.touched.quantity ? formik.errors.quantity : ''}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={''} className={'form-label'}>Giá</label>
                            <TextField
                                onChange={formik.handleChange}
                                error={formik.errors.price && formik.touched.price}
                                fullWidth
                                id="outlined-basic"
                                className="form-control"
                                name="price"
                                // label="Nhập giá sản phẩm"
                                variant="outlined"
                                value={formik.values.price}
                                helperText={formik.errors.price && formik.touched.price ? formik.errors.price : ''}
                            />
                        </div>
                        <div className="mb-3">
                            <FormLabel component="legend">
                                <span className="type-text-form">Các thể loại</span>
                            </FormLabel>
                            <div className="check-box-category">
                                {category.map((item) => (
                                        <FormControlLabel key={item.id}
                                                          control={<Checkbox onChange={choseCategory} value={item.id}/>}
                                                          label={item.name}/>
                                    )
                                )}
                            </div>

                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Chọn ảnh</label>
                            <input type="file" className="form-control" id="image" onChange={choseFileUpload}
                            />
                        </div>
                        <div className="mb-3">
                            <div style={{float: 'right'}}>
                                <button type="submit" className={'btn btn-primary'}>
                                    <i className="fa-solid fa-floppy-disk"></i>
                                </button>
                                &ensp;&ensp;
                                <Link className={'btn btn-primary'} to={'/'}>
                                    <i className={"fa-solid fa-house"}></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}

