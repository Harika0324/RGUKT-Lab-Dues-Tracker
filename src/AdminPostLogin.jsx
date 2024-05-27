import TextField from '@mui/material/TextField';
import { useState } from 'react';
export default function AdminPostLoign(){

    let [ID,setID]=useState("");
    let [student,setStudent]=useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
    const handleSubmit=async()=>{
        try {
            const response = await fetch(`https://rgukt-lab-dues-tracker.onrender.com/search?ID=${ID}`);
            if (!response.ok) {
                throw new Error('Student not found');
            }
            const data = await response.json();
            setStudent(data.student);
            console.log(data.student);
            setErrorMessage('');
        } catch (error) {
            setStudent(null);
            setErrorMessage('Student not found');
        }
    }
    const handleClear=async ()=>{
        let remarks="Cleared Remarks";
        try {
            const response = await fetch(`https://rgukt-lab-dues-tracker.onrender.com/clearRemarks?ID=${ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ remarks })
            });
            if (!response.ok) {
                throw new Error('Failed to update remarks');
            }
            // Refresh student details after update
            setID('');
              setStudent(null);
              setErrorMessage('');
              setUpdateMessage("Updated Successfully");
        } catch (error) {
            setErrorMessage('Failed to update remarks');
        }
    }

    return(
        <div>
             <TextField id="outlined-basic" label="Search Student" value={ID} 
             onChange={(e)=>setID(e.target.value)}
             variant="outlined" />
             <br /><br />
             {!student&&(
                <button onClick={handleSubmit}>Submit</button>
             )}
             {errorMessage && <p>{errorMessage}</p>}
      {updateMessage && <p>{updateMessage}</p>}
            {student&&(
                <div>
                    <p>ID={student.ID}</p>
                    <p>Name={student.Name}</p>
                    <p>Remarks={student.Remarks}</p>
                    <button onClick={handleClear}>Clear Remarks</button>
                 </div>
            )}
        </div>
    )
}