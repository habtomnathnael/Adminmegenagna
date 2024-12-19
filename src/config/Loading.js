import LoadingImage from '../img/loadingImage.gif'

const Loading = () => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', margin: 'auto' }}>
            <Loading />
            <img src={LoadingImage} alt='LoadingImage' style={{ width: '30px', height: '30px' }} />
            &nbsp; Loading...
        </div>)
}

export default Loading