import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import defaultavatar from "../assets/uploads/defaultavatar.jpg";
import { baseUrl } from '../utils/globalurl';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AlumniList = () => {
    const [alumniList, setAlumniList] = useState([]);
    const [filteredAlumni, setFilteredAlumni] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch alumni list from API
    useEffect(() => {
        axios.get(`${baseUrl}auth/alumni_list`)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setAlumniList(res.data);
                    setFilteredAlumni(res.data);
                } else {
                    console.error("API response is not an array:", res.data);
                    setAlumniList([]);
                    setFilteredAlumni([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching alumni list:", err);
                setAlumniList([]);
                setFilteredAlumni([]);
            })
            .finally(() => setLoading(false));
    }, []);

    // Search Input Handler
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    

    // Filter Alumni Based on Search Query
    useEffect(() => {
        if (!Array.isArray(alumniList)) return;

        if (searchQuery.trim() === '') {
            setFilteredAlumni(alumniList);
        } else {
            setFilteredAlumni(alumniList.filter((list) => {
                return (
                    (list.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (list.course?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (list.batch && list.batch.toString().includes(searchQuery))
                );
            }));
        }
    }, [searchQuery, alumniList]);

    return (
        <>
            {/* Header Section */}
            <header className="masthead">
                <div className="container-fluid h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end mb-4 page-title">
                            <h3 className="text-white">Alumnus/Alumnae List</h3>
                            <hr className="divider my-4" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="container mt-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="filter-field">
                                            <FaSearch />
                                        </span>
                                    </div>
                                    <input
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Filter by name, course, batch"
                                        aria-label="Filter"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                {/* ✅ Restored Dark Blue Button */}
                                <button className="btn btn-primary btn-block">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alumni List */}
            <div className="container-fluid mt-3 pt-2">
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Loading alumni data...</p>
                    </div>
                ) : filteredAlumni.length > 0 ? (
                    <div className="row">
                        {filteredAlumni.map((a, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <center>
                                        <img
                                            src={a.avatar ? `${baseUrl}${a.avatar}` : defaultavatar}
                                            className="card-img-top img-fluid alimg"
                                            alt="avatar"
                                        />
                                    </center>
                                    <div className="card-body">
                                        <h5 className="card-title text-center pad-zero">
                                            {a.name || "Unknown"}
                                            <small>
                                               
                                                <span className={`badge bg-primary text-white  ${a.status === 1 ? '' : 'd-none'}`} >
                                                    Verified
                                                </span>
                                               
                                                <span className={`badge bg-warning text-dark ${a.status === 0 ? '' : 'd-none'}`}>
                                                    Unverified
                                                </span>
                                            </small>
                                        </h5>

                                        <p className="card-text"><strong>Email:</strong> {a.email || "N/A"}</p>
                                        {a.course && <p className="card-text"><strong>Course:</strong> {a.course}</p>}
                                        {a.batch !== "0000" && <p className="card-text"><strong>Batch:</strong> {a.batch}</p>}
                                        {a.connected_to && <p className="card-text"><strong>Currently working in/as:</strong> {a.connected_to}</p>}
                                       
                                        
                                                 {/* Gmail Button */}
    {a.email && (
        <a 
            href={`mailto:${a.email}`} 
            className="btn btn-primary btn-block mb-2"
        >
            Contact via Gmail
        </a>
    )}
{console.log("Phone number:", a.phone)}  
    {/* WhatsApp Button */}
    {a.phone ? (
    <button 
        className="btn btn-success btn-block mt-2" 
        onClick={() => window.open(`https://wa.me/${a.phone}`, "_blank")}
    >
        Chat on WhatsApp
    </button>
) : (
    <p style={{ color: "red" }}>Phone number not available</p>  // Debugging
)}

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p>{searchQuery}</p>
                        <h4 className="text-info-emphasis">No Data Available</h4>
                    </div>
                )}
            </div>
        </>
    );
};

export default AlumniList;

