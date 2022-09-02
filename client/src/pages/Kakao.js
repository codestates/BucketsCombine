import React from 'react';
const Kakao = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    return (
        <div>
            { code }
        </div>
    );
};
export default Kakao;