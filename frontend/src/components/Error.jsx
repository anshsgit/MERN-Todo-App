const Error = ({error}) => {

    return <div style={{display: 'flex', justifyContent: 'center', border: '1px solid black', marginTop: '50px'}}>
    <div>{error} :Kindly try again.</div>
    </div>
}

export default Error;