import './App.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const Form = () => {
    const schema = yup.object().shape({
        fullName: yup.string().required("Your full name is required."),
        email: yup.string().email("Please enter a valid email.").required("Please enter a valid email."),
        age: yup.number().typeError("Must be a number.").positive().integer().min(18, "Age must be greater than 18.").required(),
        password: yup.string().min(4, "Password must be 4-20 characters in length.").max(20, "Password cannot exceed 20 characters.").required(),
        confirmPassword: yup.
        string()
        .oneOf([yup.ref("password"), null], "Passwords do not match.")
        .required("Please confirm your password."),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Full Name..." {...register("fullName")} />
            <p className='error-message'>{errors.fullName?.message}</p>
            <input type="text" placeholder="Email..." {...register("email")} />
            <p className='error-message'>{errors.email?.message}</p>
            <input type="number" placeholder="Age..." {...register("age")} />
            <p className='error-message'>{errors.age?.message}</p>
            <input type="password" placeholder="Password..." {...register("password")} />
            <p className='error-message'>{errors.password?.message}</p>
            <input type="password" placeholder="Confirm Password..." {...register("confirmPassword")} />
            <p className='error-message'>{errors.confirmPassword?.message}</p>
            <input type="submit" />
        </form>
    );
};