
import { useNavigate } from "react-router-dom";
import "./Home.css"
import FacImage from "./faculty.png";
import AdminImage from "./admin.png";
export default function Home(){

    const navigate=useNavigate();

    let handleFaculty=()=>{
        navigate("/login");
    }
    let handleAdmin=()=>{
        navigate("/adminlogin");
    }
    return(
        <div className="body">
            <h1>Welcome!</h1>
            <div className="container">
                <div className="box">
                    <div className="icon">
                        <img src={FacImage} alt="Faculty img" onClick={handleFaculty} className="Fac_img"/>
                        
                    </div>
                    <b>Faculty</b>
                </div>
                <div className="box">
                    <div className="icon">
                        <img src={AdminImage} alt="Admin img" onClick={handleAdmin} className="Admin_img"/>
                    </div>
                    <b>Admin</b>
                </div>
            </div>
        </div>
    );
}