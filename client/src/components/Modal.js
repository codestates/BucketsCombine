import { closeModal } from "./modals/ModalSlice";
import { useDispatch } from "react-redux";

const Modal = () => {
    const dispatch = useDispatch();
    return (
        <aside className="modal-container">
            <div className="modal">
                <h4>카드</h4>
                <div className="btn-container">
                    <button type="button" className="btn confirm-btn"
                    onClick={()=> {
                        dispatch(closeModal());
                    }}>
                        confrim
                    </button>
                    <button type="button" className="btn clear-btn"
                    onClick={()=>{
                        dispatch(closeModal());
                    }}>
                        cancel
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Modal