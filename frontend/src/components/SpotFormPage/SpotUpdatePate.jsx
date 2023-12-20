import { useEffect, useState } from 'react'
import '../SpotFormModal/SpotForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { thunkSpotUpdate, thunkSpotById } from '../../store/spots'
import { useNavigate, useParams } from 'react-router-dom'


const SpotUpdatePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const asyncGrab = async () => {
            await dispatch(thunkSpotById(id))
        }
        asyncGrab();
    }, [dispatch, id])

    const spot = useSelector((state) => state.spots[id])
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
        setLng(50);
        setLat(50);
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
        const res = await dispatch(thunkSpotUpdate(newSpot, id, images))
        if (res.errors) {
            setErrors(res.errors)
            return
        }
        console.log(`RES HERE`, res)
        navigate(`/spots/${res.id}`, {id: spot.id})
        return
    }

    return (
        <div className='spotFormDiv spotFormPageDiv'>
            <h1 className='spotFormHeader'>Update your spot</h1>
            <form onSubmit={onSubmit} className="spotForm">
                <div className='sectionContainer'>
                    <h2>{"Where's your place located?"}</h2>
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
                        fast wifi or parking, and what you love about the neighborhood.</p>
                    {errors.description && <p className='errors'>{errors.description}</p>}
                    <textarea maxLength={1000} name='description' rows={8} cols={60} value={description} className={`spotDescription`} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='sectionContainer'>
                    <h2>Create a title for your spot</h2>
                    <p>{`Catch guests' attention with a spot title that highlights what makes
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
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    {errors.previewImage && <p className='errors'>{errors.previewImage}</p>}
                    <input name='previewImage' type='url' value={previewImage} className={`spotInput`} onChange={(e) => setPreviewImage(e.target.value)} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 1: e.target.value })} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 2: e.target.value })} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 3: e.target.value })} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 4: e.target.value })} />
                </div>
                <div className='location button'>
                    <button className='spotSend'>Update your spot</button>
                </div>

            </form>
        </div>
    )
}
export default SpotUpdatePage
