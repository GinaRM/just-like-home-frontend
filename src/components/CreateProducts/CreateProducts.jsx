import React, { useState, useEffect, useContext } from "react";
import bootstrap from "bootstrap";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import Url from "../../util/Url";
import ProductHeader from "../Products/ProductHeader"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import create from "./create.css"
import Radio from '@mui/material/Radio';
//import PolicyCard from "./Policy Card/PolicyCard";



const CreateProducts = () => {
    const [categoriesInfo, setCategoriesInfo] = useState([]);
    const [cities, setCities] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [policies, setPolicies]= useState([]);


    
    useEffect(() => {
        const urlCity = Url() + "/api/city";
        axios.get(urlCity)
            .then(response => setCities(response.data))
            .catch(error => console.log(error))
        const url = Url() + "/api/category/";
        axios
            .get(url)
            .then((response) => setCategoriesInfo(response.data))
            .catch((error) => console.log(error));
        const urlAmenities = Url() + "/api/amenity";
        axios
            .get(urlAmenities)
            .then((response) => setAmenities(response.data))
            .catch((error) => console.log(error));

        const urlPolicy = Url() + "/api/policy";
        axios
            .get(urlPolicy)
            .then((response) =>  setPolicies(response.data))
            .catch((error) => console.log(error));
            

    }, []);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null)
    const [isSubmit, setIsSubmit]= useState(false);
    const [formErrors, setFormErrors]=useState({});
    


    const [formValues, setFormValues]=useState({
        title: null,
        categoryId: null,
        images: [],
        imagesId: [],
        descriptionTitle: null,
        description: null,
        amenitiesId: [],
        availability: true,
        policyId: {id: 1},
        cityId: null,
        address: null
    }
    )

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({...formValues, [name]:value});
    }



    
    const validInput = (values)=>{
        const errors ={}
        if(!values.title){
            errors.title = "El título es obligatorio"
        }else if(values.title.length<3){
            errors.title = "El título tiene que tener más de 3 caracteres"
        }

        if (!values.categoryId){
            errors.categoryId = "La categoria es obligatoria"
        } 

        if (!values.cityId){
            errors.cityId = "La ciudad es obligatoria"
        }

        if (!values.descriptionTitle){
            errors.descriptionTitle = "El titulo de la descripción es obligatorio"
        }else if (values.descriptionTitle.length>=100 || values.descriptionTitle.length<4){
            errors.descriptionTitle = "El titulo tiene que tener entre 4 a 100 caracteres"
        }

        if (!values.description){
            errors.description = "La descripción es obligatoria"
        }else if (values.description.length>=1500 || values.description.length<100){
            errors.description = "El titulo tiene que tener entre 100 a 1500 caracteres"
        }

        if (!values.address){
            errors.address = "La dirección es obligatoria"
        }
        

        if (!values.amenitiesId){
            errors.amenitiesId = "Seleccione una característica"
        }

        if (!values.images){
            errors.images = "Este campo es obligatorio"
        }else if (values.images.length<5){
            errors.images = "Agregue 5 o más imágenes"
        }

        return errors;
    }

    let token = localStorage.getItem("jwt");

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setFormErrors(validInput(formValues))
        if(Object.keys(validInput(formValues)).length === 0){
            const productData = {
  
                title: formValues.title,
                category: {id: formValues.categoryId},
                images: formValues.imagesId,
                description_title: formValues.descriptionTitle,
                description: formValues.description,
                amenities: formValues.amenitiesId,
                availability: true,
                policy: {id: 1},
                city: {id: formValues.cityId}
            }

            await postImages();
            const allImg = await getImages();

            productData.images = findImagesId(formValues, allImg)
                
            
            const postProduct = async () => {

                try {
    
                    const url = Url() + "/api/product";
                    const response = await axios.post(url, productData,{
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                    });
    
                    if (response.request.status === 201) {
                        navigate("/ConfirmationProduct")
                    }
                    else {
                        setErrorMessage("Lamentablemente, el producto no ha podido crearse. Por favor, intente más tarde")
                    }
                } catch (error) {
                    console.log(error);
                    setErrorMessage("Lamentablemente, el producto no se puede crear")
                }
    
            }
            await postProduct()
            
            
        

        }
    }

    
    



    // ---------------------------------------------   CARACTERISTICAS

    const handleCheckbox = (e) =>{
        if (e.target.checked){

            formValues.amenitiesId.push({ id:e.target.value}) 
        } else if (!e.target.checked){
            const allAmeneties = formValues.amenitiesId;
            let foundIndex = allAmeneties.map(a =>a.id).indexOf(e.target.value)
            allAmeneties.splice(foundIndex, 1);
        }

    }


    //-------------------------------------------------   IMAGENES  ----------------------------
    

    //  POST Y GET DE IMÁGENES ------

    const [postCreatedImg, setPostCreatedImg] = useState(false)


    const postImages = async ()=>{
        const dataImg = formValues.images;

        //const imagenes = []
        try {
            const url = Url() + "/api/image/addMany";
            const result = await axios.post(url, dataImg,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
      
            if (result.request.status === 200) {
              console.log("Post de imágenes bien");
              setPostCreatedImg(true)
            } 
        } catch (e) {
            console.log(e.message);
        }
    }

    const getImages = async()=>{
        try{
            const url = Url()+ "/api/image";
            const result = await axios.get(url);
            return result.data;
        } catch(e){
            console.log(e.message)
        }
    }

    

    const findImagesId = (imgsForm, allImg) => {
        //array con los nombres de las imágenes que subí
        let titleImg = imgsForm.images.map(i=>i.title);
        //Mapeo de los nombres, por cada nombre busca si es igual a algún titulo de las imgs de la Base de datos
        //Cuando lo encuentra, desestructura para devolverme sólo el id de esa imagen
        const imgIds = titleImg.map(title=>{
            const {id} = allImg.find(imageItem => imageItem.title == title);
            
            return {id}
        }) 
        
        return imgIds
        
    }



    const [img, setImg] = useState(
        {
            imageURL: null,
            main_img: null,
            title: null,
        }
    );

    const handleImg = (e) => {
        setImg({ imageURL: e.target.value, main_img: "0", title: getImageName(e.target.value) });
    }


    const getImageName = imageName => {
        let name = imageName;
        let separatedName = name.split("/");
        let lastElement = separatedName.pop()
        if (lastElement.length>15){

        }
        return lastElement
    }

    const addImage = () => {

        formValues.images.push(img)
        setImg({ imageURL: "", main_img: "", title: "" })
    }


    const deleteImage = (index) => {
        const allImages = formValues.images
        allImages.splice(index, 1);
        setFormValues({ ...formValues, images: allImages })
    }


    //Para abreviar el titulo
    const abbTitle = (title)=>{
        //si length>15 entonces cortalo, agregar ...img
        let lengthTitle = title.length;
        let newTitle
        if (lengthTitle>15){
            newTitle = title.slice(0,14)
        }else{
            return title
        }

        return newTitle+'...'
    }


    // ---------------------------------------      RADIO BUTTON: Seleccionar imagen principal

    const [selectedValue, setSelectedValue] = useState(null);

    const handleChangeRadioButton = (event) => {
        formValues.images.map(imgg => imgg.main_img = '0');
        const index = parseInt(event.target.value.split('image')[1]);
        formValues.images[index].main_img='1';
        setSelectedValue(event.target.value); 
    };

    const RadioButton = ({ ix }) => {

        const controlProps = (item) => ({
            checked: selectedValue === item,
            onChange: handleChangeRadioButton,
            value: item,
            name: 'image',
            inputProps: { 'aria-label': item },
        });

        return (
            <Radio
                {...controlProps('image' + ix)}
                sx={{
                    color: "#496270",
                    '&.Mui-checked': {
                        color: "#e48561",
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: 20,
                    },
                }}
            />
        )

    }



    return (

        <div className="main">
            <ProductHeader title={"Administración"} path={"/"} />
            <div className="create-product-block">
                <h1 className="title-h1">Crear producto</h1>

                <form className="product-form">
                    <div className="inputs-block">
                        <div className="info-form">
                            <label htmlFor="title">Nombre del producto:</label>
                            <input type="text" name="title" id="title" onChange={handleChange} />
                            <p className="error">{formErrors.title}</p>
                        </div>

                        <div className="info-form" id="categoryDiv">
                            <label htmlFor="categoryId">Categoría:</label>
                            <select name="categoryId" className="select-input" onChange={handleChange}>
                                <option value="">Seleccione una categoría</option>
                                {categoriesInfo.map((category, index) => (
                                    <option value={category.id} key={index} >{category.title}</option>
                                ))}
                            </select>
                            <p className="error">{formErrors.categoryId}</p>

                        </div>


                        <div className="info-form" id="cityDiv">
                            <label htmlFor="cityId">Ciudad:</label>
                            <select name="cityId" className="select-input" value={formValues.city} onChange={handleChange} >
                                <option value="">Seleccione la ciudad</option>
                                {cities.map((city, index) => (
                                    <option value={city.id} key={index}>
                                        {city.name}
                                    </option>

                                ))}

                            </select>
                            <p className="error">{formErrors.cityId}</p>
                        </div>


                        <div className="info-form">
                            <label htmlFor="address">Dirección:</label>
                            <input type="text" name="address" id="address" value={formValues.address} onChange={handleChange}/>
                            <p className="error">{formErrors.address}</p>
                        </div>

                        <div className="info-form">
                            <label htmlFor="descriptionTitle">Titulo de la descripción:</label>
                            <input type="textarea" name="descriptionTitle" id="descriptionTitle" value={formValues.descriptionTitle} onChange={handleChange}
                                placeholder="Hermosa casa de playa" required />
                            <p className="error">{formErrors.descriptionTitle}</p>
                        </div>

                        <div className="info-form">
                            <label htmlFor="description">Descripción:</label>
                            <textarea name="description" className="description-form" minLength={"100"} maxLength={"1500"} autoCapitalize="sentences"
                                value={formValues.description} onChange={handleChange} required></textarea>
                            <p className="error">{formErrors.description}</p>
                        </div>
                    
                    </div>
                    


                    <div className="amenities-block">
                        <h2>Características</h2>
                        <div className="amenities">
                        {amenities.map((amenitie, index) => (
                        <label key={index} className="amenitie"><input className="amenitie-checkbox" type="checkbox" id="amenitiesId" value={amenitie.id}
                        onChange={handleCheckbox}
                        
                        />{ amenitie.title }</label>     
                        ))}
                        </div>

                        <p className="error">{formErrors.amenetiesId}</p>
                        
                    </div>

                    <div className="images-block">
                        <h2>Cargar imágenes</h2>

                        <div className="info-form">
                            <label htmlFor="images">Agregue 5 o más imágenes y de ellas elija una como principal</label>


                            <div className="input-image">
                                <input type="text" name="url" value={img.imageURL} onChange={handleImg} placeholder="Inserte https://"/>
                                <FontAwesomeIcon icon={faCirclePlus} onClick={addImage} />
                                
                            </div>
                            <p className="error">{formErrors.images}</p>

                            {formValues.images.map((image, index) => (
                            <div key={index} className="imageName-card">
                                <RadioButton ix={index} />
                                <label htmlFor="image">{abbTitle(image.title)}</label>
                                <FontAwesomeIcon icon={faXmark} onClick={() => deleteImage(index)} />
                            </div>
                            ))}

                        </div>
                    </div>


                    {/* defaultValue={policies[0].rules}
                    defaultValue={policies[0].health_safety}
                    defaultValue={policies[0].cancellation_policy}
                    
                    
                    */}
                   <div className="policy-block">
                        <h2>Políticas de la propiedad</h2>

                        
                        <label htmlFor="rules">Normas de la casa:</label>
                        <textarea name="rules" className="description-form" minLength={"20"} maxLength={"500"} autoCapitalize="sentences"
                            ></textarea>
                    
                        <label htmlFor="health-safety">Salud y seguridad:</label>
                        <textarea name="health-safety" className="description-form" minLength={"20"} maxLength={"500"} autoCapitalize="sentences"
                             ></textarea>

                        <label htmlFor="cancellation-policy">Políticas de cancelación:</label>
                        <textarea name="cancellation-policy" className="description-form" minLength={"20"} maxLength={"500"} autoCapitalize="sentences"
                             ></textarea>
                        
                        
                    </div>
                    

                    

                    <div>
                        <p className="error">{errorMessage}</p>
                    </div>
                    <button className="button-2" onClick={handleSubmit}>Crear</button>

                </form>
            </div>

        </div>


    )

}


export default CreateProducts