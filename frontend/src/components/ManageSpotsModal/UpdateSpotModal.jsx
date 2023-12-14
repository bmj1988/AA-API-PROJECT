import { useState } from 'react'
import '../SpotFormModal/SpotForm.css'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { thunkSpotUpdate } from '../../store/spots'
import SpotModal from '../Main/SpotModal/SpotModal'

const UpdateSpotModal = ({spot}) => {
    const { setModalContent } = useModal();
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot.address);
    const [description, setDescription] = useState(spot.description);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    const [previewImage, setPreviewImage] = useState(spot.previewImage);
    const [images, setImages] = useState({})
    const [errors, setErrors] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setLng(spot.lng);
        setLat(spot.lat);
        const newSpot = {
            address,
            description,
            city,
            state,
            country,
            lat,
            lng,
            name,
            price,
            previewImage,

        }
        const res = await dispatch(thunkSpotUpdate(newSpot, spot.id))
        if (res.errors) {
            setErrors(res.errors)
            return
        }
        setModalContent(<SpotModal spot={res}/>);

    }

    return (
        <div className='spotFormDiv'>
            <h1 className='spotFormHeader'>Create a New Spot</h1>
            <form onSubmit={onSubmit} className="spotForm">
                <div className='sectionContainer'>
                    <h2>{`Where&apos;s your place located?`}</h2>
                    <p>Guests will only get your exact address once they booked a
                        reservation</p>

                    <label htmlFor='country'>Country</label> {errors.country && <p className='errors'>{errors.country}</p>}
                    <input name='country' type='text' value={country} className={`spotInput`} onChange={(e) => setCountry(e.target.value)} />
                    <label htmlFor='address'>Street Address</label>{errors.address && <p className='errors'>{errors.address}</p>}
                    <input name='address' type='text' value={address} className={`spotInput`} onChange={(e) => setAddress(e.target.value)} />

                    <div className='location'>
                        <label htmlFor='city'>City</label>
                        {errors.city && <p className='errors'>{errors.city}</p>}
                        <input name='city' type='text' value={city} className={`spotInput`} onChange={(e) => setCity(e.target.value)} />
                        <label htmlFor='state'>State</label>
                        {errors.state && <p className='errors'>{errors.state}</p>}
                        <input name='state' type='text' value={state} className={`spotInput`} onChange={(e) => setState(e.target.value)} />
                    </div>
                </div>
                <div className='sectionContainer'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like
                        fast wif or parking, and what you love about the neighborhood.</p>
                    {errors.description && <p className='errors'>{errors.description}</p>}
                    <textarea name='description' rows={8} cols={60} value={description} className={`spotDescription`} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='sectionContainer'>
                    <h2>Create a title for your spot</h2>
                    <p>{`Catch guest&apos; attention with a spot title that highlights what makes
                        your place special.`}</p>
                    {errors.name && <p className='errors'>{errors.name}</p>}
                    <input name='name' type='text' value={name} className={`spotInput`} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='sectionContainer'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher
                        in search results.
                    </p>
                    <div className='location'>
                        {errors.price && <p className='errors'>{errors.price}</p>}
                        {'$'}<input name='price' type='number' value={price} className={`spotInput`} onChange={(e) => setPrice(Number(e.target.value))} />
                    </div>
                </div>
                <div className='sectionContainer'>
                    {errors.previewImage && <p className='errors'>{errors.previewImage}</p>}
                    <input name='previewImage' type='url' value={previewImage} className={`spotInput`} onChange={(e) => setPreviewImage(e.target.value)} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 1: e.target.value })} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 2: e.target.value })} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 3: e.target.value })} />
                </div>
                <div className='location button'>
                    <button className='spotSend'>Update Spot</button>
                </div>

            </form>
        </div>
    )
}
export default UpdateSpotModal;
