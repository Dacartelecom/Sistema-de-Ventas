import React from 'react';

const Danger = () => {
    return (
        <div className='alert-container'>
            <div class="alert alert-danger" role="alert">
                <ion-icon name="close-outline"></ion-icon>
                Error
            </div>
        </div>
    );
};

export default Danger;