import React, {useEffect} from 'react';

export const IntervalList = props => {

    useEffect(() => {
        props.mapIntervals(props.setIntervals)
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-10 offset-1'>
                    <p className='fontsize-48'>{props.title}</p>
                    <table className="table table-condensed">
                        <thead>
                            <tr>
                                <th>Nazwa</th>
                                <th>Status</th>
                                <th>Data roozpoczęcia</th>
                                <th>Data zakończenia</th>
                                <th>Opcje</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.intervals}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

};
