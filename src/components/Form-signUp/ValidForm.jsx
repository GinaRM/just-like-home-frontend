import { Form } from "formik";
import React, {useState} from "react";


function ValidForm(){
    const [values,setValues] = useState({
        name: "",
        lastName:"",
        email: "",
        password: "",
        repPassword:""
    }
    );


    function handleSubmit(e){
        e.preventDefault();

    }

    function handleChange(e){
        const{target}=e;
        const {name,value}=target;


        const newValues={
            ...values,
            [name]:value
        };
        setValues(newValues);
    }


    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre</label>
            <input onChange={handleChange} type="text" id="name" name="name" value={values.name}/>


            <label htmlFor="lastName">Apellido</label>
            <input onChange={handleChange} type="text" id="lastName" name="lastName" value={values.lastName}/>


            <button type="submit">Crear cuenta</button>

        
        
        </form>


    )
}

/*

const FormUp =(){



    
    const getValues = (target) =>{
        return(
            {
                name:target.name.value,
                lastName: target.lastName.value,
                email: target.email.value,
                password: target.password.value,
                repPassword: target.repPassword.value
            }

        ) 
    }

    const validInput = (event)=> {
        const data = getValues(event.target)

        const nameError = [];
        const lastNameError = [];
        const emailError = [];
        const passwordError = [];
        const repPasswordError = [];

         
        if (data.name ==""){
            nameError.push("Este campo es obligatorio")
        } else if (data.name.length<3){
            nameError.push("El nombre tiene que tener más de 3 letras")
        }


        if (data.lastName ==""){
            lastNameError.push("Este campo es obligatorio")
        } else if (data.lastName.length<3){
            lastNameError.push("El apellido tiene que tener más de 3 letras")
        }

        if (data.email ==""){
            emailError.push("Este campo es obligatorio")
        }else if (data.email.includes("@")== false){
            emailError.push("Este campo tiene que tener un arroba @")
        }else if (data.email.includes(".com")== false){
            emailError.push("Este campo tiene que tener .com")
        }


        if (data.password.length>=15||data.password.length<6){
            passwordError.push("La contraseña tiene que tener entre 6 a 15 caracteres")
        }else if(data.password==""){
            passwordError.push("Este campo es obligatorio")
        }
    
        if (data.repPassword !== data.password){
            repPasswordError.push("El campo de Contraseña y Repetir Contraseña no coinciden")
        }


        
        if (nameError.length == 0 && lastNameError.length==0 && emailError.length==0 && passwordError.length == 0 && repPasswordError.length == 0){
            userData.push(
                {
                    name:data.name,
                    lastName:data.lastName,
                    email: data.email,
                    password: data.password,
                },
            );

        }

    }

    
    const handleSubmit = event =>{
        event.preventDefault();
        
        validInput(event);

        console.log(userData);
 
    }
 
    */



    /*
    const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

    const expresions = {
        name: /^[a-zA-Z0-9\_\-]{3,16}$/, 
	    lastName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, 
	    password: /^.{6,15}$/,
	    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }
    const [values,setValues] = useState({
        name: "",
        lastName:"",
        email: "",
        password: "",
        repPassword:""
    }
    );
    */

    /*/

    function handleChange(e){
        const{target}=e;
        const {name,value}=target;


        const newValues={
        ...values,
        [name]:value
        };
        setValues(newValues);    
        
        
    }

}

*/