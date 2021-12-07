import {useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import MaskInput from "react-maskinput";
import {Alert, Button} from "react-bootstrap";

const schema = yup.object().shape({
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    country: yup.string().required("This field is required"),
    address: yup.string().required("This field is required"),
    creditCard: yup.string().test('creditCard', 'Must be exactly 16 characters', val => !val || (val && val.toString().length === 19)).required("This field is required"),
    cvvCode: yup.string().test('cvvCode', 'Must be 3 characters', val => !val || (val && val.toString().length === 3)).required("This field is required"),
    email: yup.string().email(),
});
// test('creditCard', 'Must be exactly 16 characters', val => !val || (val && val.toString().length === 16))



export default function Form() {

    const { register, control, reset, handleSubmit, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(schema),
    });

    const submitForm = (data) => {
        fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        console.log(data)
        reset()
    }

    return (
        <form className='form bg-light rounded-3 p-3 m-auto w-100' onSubmit={handleSubmit(submitForm)}>
            <h3 className='mb-5'>Form test</h3>
            <div className='form__wrapper d-flex flex-column gap-3 align-items-center'>
                <input className='border-0 w-100 shadow-sm border-primary rounded-3 px-3 py-2 text-secondary' type="text" name='firstName' placeholder='Name' {...register('firstName')} />
                {errors.firstName && <Alert className='h-25' variant={"danger"}>{errors.firstName?.message}</Alert>}

                <input className='border-0 w-100 shadow-sm border-primary rounded-3 px-3 py-2 text-secondary' type="text" name='lastName' placeholder='Last name' {...register('lastName')} />
                {errors.lastName && <Alert variant={"danger"} >{errors.lastName?.message}</Alert>}

                <input className='border-0 w-100 shadow-sm border-primary rounded-3 px-3 py-2 text-secondary' type="text" name='country' placeholder='Country' {...register('country')} />
                {errors.country && <Alert variant={"danger"} >{errors.country?.message}</Alert>}

                <input className='border-0 w-100 shadow-sm border-primary rounded-3 px-3 py-2 text-secondary' type="text" name='address' placeholder='Address' {...register('address')} />
                {errors.address && <Alert variant={"danger"} >{errors.address?.message}</Alert>}

                <Controller
                    control={control}
                    name="creditCard"
                    render={({ field: { onChange, onBlur } }) => (
                        <MaskInput
                            className='border-0 w-100 shadow-sm border-primary rounded-3 px-3 py-2 text-secondary'
                            mask='0000-0000-0000-0000'
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder='Credit card'
                        />
                    )}
                />

                {/*<MaskInput   name='creditCard' placeholder='Credit card' {...register('creditCard')} />*/}

                {/*<input type="text" name='creditCard' placeholder='Credit card' {...register('creditCard')} />*/}
                {errors.creditCard && <Alert variant={"danger"} >{errors.creditCard?.message}</Alert>}

                <Controller
                    control={control}
                    name="cvvCode"
                    render={({ field: { onChange, onBlur } }) => (
                        <MaskInput
                            className='border-0 w-100 shadow-sm border-primary rounded-3 px-3 py-2 text-secondary'
                            mask='000'
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder='CVV2'
                        />
                    )}
                />

                {/*<input type="number" name='cvvCode' placeholder='CVV2' {...register('cvvCode')} />*/}
                {errors.cvvCode && <Alert variant={"danger"} >{errors.cvvCode?.message}</Alert>}

                <input className='border-0 w-100  shadow-sm border-primary rounded-3 px-3 py-2 text-secondary' type="email" name='email' placeholder='E-mail' {...register('email')} />
                {errors.email && <Alert variant={"danger"} >{errors.email?.message}</Alert>}

                <div className='form-check mt-3'>
                    <input className='form-check-input' name='checkbox' type="checkbox" required/>
                    <label htmlFor='checkbox'>I agree to the <a className='text-info' href="/">terms of usage</a></label>
                </div>

                <Button className='w-25' variant={"primary"} type="submit">Send</Button>
            </div>
        </form>
    )
}