import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil, faLocationDot, faPhoneFlip, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const ContactCard = ({item, onEdit, onDelete})=>{
    
    return (           
        <div  
            className="card rounded-0 container-fluid mb-1" 
            style={{maxWidth: `70vh`}} 
            >
            <div className="row align-items-center">
                <div className="col-md-3 text-center">
                    <img 
                        src={`https://picsum.photos/id/${item.id}/150/150`} 
                        className="img-fluid rounded-circle my-3" alt="..." 
                    />
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h3 className="card-title text-mu">{item.name}</h3>
                                <div className="d-flex father-btn">
                                    <div 
                                        className="button btn-primary show-it "
                                        onClick={()=> onEdit()}>
                                            <FontAwesomeIcon icon={faPencil} />
                                    </div>
                                    <div 
                                        className="button btn-primary ms-5 show-it"
                                        onClick={()=> onDelete(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center text-secondary">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <li className="list-group-item ms-2">{item.address}</li>
                            </div>
                            <div className="d-flex justify-content-start align-items-center text-secondary">
                                <FontAwesomeIcon icon={faPhoneFlip} />
                                <li className="list-group-item ms-2">{item.phone}</li>
                            </div>
                            <div className="d-flex justify-content-start align-items-center text-secondary">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <li className="list-group-item ms-2">{item.email}</li>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}