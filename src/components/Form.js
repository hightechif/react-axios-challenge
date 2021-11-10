import Input from "./Input";
import { Button } from "@elevenia/master-ui/components/Atom";

const Form = (props) => {
    const {biodata, handleChange, handleSubmit, isRegistered, isLoginSuccess, isRegisterSuccess, isSubmit} = props;

    return (
        <form onSubmit={async (event) => await handleSubmit(event)} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <Input styledType="TwoLeft" type="text" name="username" value={biodata.username} onChange={(event) => handleChange(event)} placeholder="johndoe" />
                <Input styledType="TwoRight" type="password" name="password" value={biodata.password} onChange={(event) => handleChange(event)} placeholder="******************" />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                {isRegistered && <div className="w-full px-3 mb-6 md:mb-0">
                    <Button type="submit" className="w-full font-bold text-xl" variant="secondary">Login</Button>
                </div>}
                {!isRegistered && <div className="w-full px-3 mb-6 md:mb-0">
                    <Button type="submit" className="w-full font-bold text-xl" variant="secondary">Register</Button>
                </div>}
            </div>
            <div className="w-full -mx-3 mb-6 text-center">
                {isRegistered && !isLoginSuccess && <p className="text-red-600 text-xs italic">Username or password is invalid</p>}
                {!isRegistered && isSubmit && !isRegisterSuccess && <p className="text-red-600 text-xs italic">Username already exist</p>}
                {!isRegistered && isSubmit && isRegisterSuccess && <p className="text-green-600 text-xs italic">Registration Success</p>}
            </div>
        </form>
    )
}

export default Form;
