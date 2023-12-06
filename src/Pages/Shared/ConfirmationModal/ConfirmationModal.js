import React from 'react';

const ConfirmationModal = ({action, actionDataId, title, closeModal}) => {
    return (
        <div>
            <input type="checkbox"  id="confirmation-modal" className="modal-toggle" />
            <div className="modal w-auto max-w-none">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>

                    <div className="modal-action">

                        {/* if there is a button in form, it will close the modal */}
                        <label onClick={() => action(actionDataId)}   htmlFor="confirmation-modal" className="btn">Yes</label>
                        <button onClick={closeModal}  className="btn">Cancel</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;