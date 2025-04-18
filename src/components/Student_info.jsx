import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../utils/globalurl';

const UpdateStudentInfo = () => {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        batch: '',
        department: '',
        programming_languages: '',
        certifications: '',
        skills: '',
        interested_field: '',
    });

    useEffect(() => {
        const student_id = localStorage.getItem("student_id");
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`${baseUrl}student/details?id=${student_id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchStudentData();
    }, []);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const student_id = localStorage.getItem("student_id");
        try {
            const response = await axios.put(`${baseUrl}student/update`, { ...student, student_id });
            toast.success(response.data.message);
        } catch (error) {
            toast.error('An error occurred while updating student info');
            console.error('Error:', error);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <header className="masthead">
                <div className="container text-center">
                    <h3 className="text-white">Update Student Information</h3>
                    <hr className="divider my-4" />
                </div>
            </header>
            <section className="page-section bg-dark text-white">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" value={student.name} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" value={student.email} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Batch</label>
                            <input type="text" name="batch" className="form-control" value={student.batch} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input type="text" name="department" className="form-control" value={student.department} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Programming Languages</label>
                            <input type="text" name="programming_languages" className="form-control" value={student.programming_languages} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Certifications</label>
                            <input type="text" name="certifications" className="form-control" value={student.certifications} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Skills</label>
                            <input type="text" name="skills" className="form-control" value={student.skills} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Interested Field</label>
                            <input type="text" name="interested_field" className="form-control" value={student.interested_field} onChange={handleChange} required />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-secondary">Update Information</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default UpdateStudentInfo;
