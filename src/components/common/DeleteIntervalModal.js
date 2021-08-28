import React from 'react';
import {onIntervalDelete} from "../../eventhandlers/IntervalEventHandler";

export const DeleteIntervalModal = props => {
    return (
        <div className="modal fade" id="deleteIntervalModal" tabIndex="-1" role="dialog" aria-labelledby="deleteIntervalModal"
             aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Czy chcesz usunąć interwał?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Nie</button>
                        <button id='confirmDeleteInterval' type="button" className="btn btn-danger" data-dismiss="modal" onClick={onIntervalDelete}>Tak</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
