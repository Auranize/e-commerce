import { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import toast from 'react-hot-toast';
import { useT } from '../hooks/useT';

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { products = [], currency, addToCart } = useContext(ShopContext);
  const videoRef = useRef(null);
  const t = useT();

  const [productData, setProductData] = useState(null);
  const [mediaType, setMediaType] = useState('image'); // 'image' or 'video'
  const [selectedMedia, setSelectedMedia] = useState('');
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({}); // Track loading state of each image
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [tabView, setTabView] = useState('description'); // 'description' or 'reviews'

  // Enhanced scroll to top logic that works on all navigation events
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    handleScroll();
    
    return () => {
      // Cleanup if needed
    };
  }, [productId, location.pathname]);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      setMainImageLoaded(false);
      
      if (!products || products.length === 0) return;

      const foundProduct = products.find(item => item._id === productId);
      if (foundProduct) {
        console.log('Product found:', foundProduct);
        setProductData(foundProduct);
        
        // Initialize loading states for all media
        const initialLoadingState = {};
        if (foundProduct.image && foundProduct.image.length > 0) {
          foundProduct.image.forEach(img => {
            initialLoadingState[img] = false;
          });
        }
        setImageLoading(initialLoadingState);
        
        // Set default media (prioritize first image if available)
        if (foundProduct.image && foundProduct.image.length > 0) {
          setSelectedMedia(foundProduct.image[0]);
          setMediaType('image');
        } else if (foundProduct.video && foundProduct.video.length > 0) {
          setSelectedMedia(foundProduct.video[0]);
          setMediaType('video');
        }
        
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    fetchProductData();
  }, [productId, products]);

  // Handle media selection
  const handleMediaSelect = (media, type) => {
    setSelectedMedia(media);
    setMediaType(type);
    setMainImageLoaded(false);
    
    // Pause any playing video when switching media
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Handle image load event
  const handleImageLoad = (imageSrc) => {
    setImageLoading(prev => ({
      ...prev,
      [imageSrc]: true
    }));
    
    if (imageSrc === selectedMedia) {
      setMainImageLoaded(true);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="animate-pulse border-t-2 pt-10">
        <div className="flex gap-12 flex-col sm:flex-row">
          {/* Image skeleton */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[18.7%] w-full">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0">
                  <div className="bg-gray-200 w-full h-24 rounded"></div>
                </div>
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <div className="bg-gray-200 w-full h-96 rounded"></div>
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="flex-1">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">{t('product_loading')}</p>
        </div>
      </div>
    );
  }

  // Create a combined media array for the gallery
  // Only include video if it exists and is not an empty array
  const productMedia = [
    ...(productData.image || []).map(img => ({ src: img, type: 'image' })),
    ...((productData.video && productData.video.length > 0) ? 
       productData.video.map(vid => ({ src: vid, type: 'video' })) : [])
  ];

  return (
    <div className="border-t-2 pt-10 transition-all duration-500">
      {/* Product data */}
      <div className="flex gap-6 lg:gap-12 flex-col sm:flex-row">
        {/* Product images & video */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productMedia.map((media, index) => (
              <div 
                key={index} 
                onClick={() => handleMediaSelect(media.src, media.type)}
                className={`relative w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer transition-all duration-300 ${selectedMedia === media.src ? 'border-2 border-black' : 'border border-gray-200'}`}
              >
                {media.type === 'image' ? (
                  <>
                    {!imageLoading[media.src] && (
                      <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
                    )}
                    <img
                      className={`w-full h-auto transition-opacity duration-300 ${imageLoading[media.src] ? 'opacity-100' : 'opacity-0'}`}
                      src={media.src}
                      alt={`${t('product_media_alt')} ${index + 1}`}
                      onLoad={() => handleImageLoad(media.src)}
                    />
                  </>
                ) : (
                  <div className="relative">
                    <video 
                      className="w-full h-auto"
                      src={media.src}
                      muted
                      poster={productData.videoPoster || productData.image?.[0]}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-full sm:w-[80%] relative">
            {!mainImageLoaded && mediaType === 'image' && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
            )}
            {mediaType === 'image' ? (
              <div className="relative overflow-hidden rounded-sm group">
                <img 
                  className={`w-full h-auto transition-opacity duration-500 ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  src={selectedMedia} 
                  alt={t('product_selected')} 
                  onLoad={() => setMainImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>
            ) : (
              <div className="relative rounded-sm overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  src={selectedMedia}
                  controls
                  poster={productData.videoPoster || productData.image?.[0]}
                />
              </div>
            )}
          </div>
        </div>

        {/* Product information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl sm:text-3xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="Star" className="w-4" />
            <p className="pl-2 text-gray-600">{t('product_reviews')}</p>
          </div>
          
          <div className="flex items-center mt-5">
            <p className="text-3xl font-medium">{currency}{productData.price}</p>
            {productData.discount && (
              <>
                <p className="text-xl text-gray-400 line-through ml-3">{currency}{productData.discount}</p>
                <p className="text-sm text-green-600 ml-3">
                  {Math.round(((productData.discount - productData.price) / productData.discount) * 100)}{t('product_off')}
                </p>
              </>
            )}
          </div>
          
          <div className="mt-3 text-sm text-green-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t('product_in_stock')}
          </div>
          
          <p className="mt-5 text-gray-600 md:w-4/5 leading-relaxed whitespace-pre-line">{productData.description}</p>

          {/* Features if available */}
          {productData.features && productData.features.length > 0 && (
            <div className="mt-5">
              <p className="font-medium mb-2">{t('product_features')}</p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                {productData.features.map((feature, index) => (
                  <li key={index} className="mb-1">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Details table */}
          <div className="mt-6 border rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {productData.movement && (
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium bg-gray-50">{t('product_movement')}</td>
                    <td className="py-2 px-4">{productData.movement}</td>
                  </tr>
                )}
                {productData.strapMaterial && (
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium bg-gray-50">{t('product_strap_material')}</td>
                    <td className="py-2 px-4">{productData.strapMaterial}</td>
                  </tr>
                )}
                <tr>
                  <td className="py-2 px-4 font-medium bg-gray-50">{t('product_category')}</td>
                  <td className="py-2 px-4">{productData.category} / {productData.subCategory}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Colour selection */}
          {productData?.colours?.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <p className="font-medium">{t('product_select_colour')}</p>
              <div className="flex flex-wrap gap-2">
                {productData.colours.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 rounded transition-all hover:border-black ${
                      item === size 
                        ? 'border-black bg-black text-white shadow-md' 
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={async () => {
                if (!size && productData?.colours?.length > 0) {
                  toast.error(t('product_select_colour_error'));
                  return;
                }
                const added = await addToCart(productData._id, size);
                console.log(added);

                if (added) {
                  toast.success(t('product_added_to_cart'));
                  navigate('/cart');
                } else {
                  toast.error(t('product_login_required'));
                  navigate("/login");
                }
              }}
              className="bg-black text-white px-8 py-3 text-sm font-medium rounded-sm transition hover:bg-gray-800 active:bg-gray-700 w-full sm:w-auto flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {t('product_add_to_cart')}
            </button>
            <button className="border border-black px-8 py-3 text-sm font-medium rounded-sm transition hover:bg-gray-100 w-full sm:w-auto flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {t('product_wishlist')}
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-600 mt-5 flex flex-col gap-3">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>{t('product_quality_guarantee')}</p>
            </div>
            {/* <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>Cash on delivery is available on this product</p>
            </div> */}
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>{t('product_return_policy')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review and Description */}
      <div className="mt-20">
        <div className="flex border-b">
          <button 
            onClick={() => setTabView('description')}
            className={`px-5 py-3 text-sm font-medium transition ${tabView === 'description' ? 'border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t('product_description')}
          </button>
          <button 
            onClick={() => setTabView('reviews')}
            className={`px-5 py-3 text-sm transition ${tabView === 'reviews' ? 'border-b-2 border-black font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t('product_reviews_tab')}
          </button>
        </div>
        
        {tabView === 'description' && (
          <div className="flex flex-col gap-4 py-6 text-sm text-gray-600 leading-relaxed">
            <p>{t('product_description_text_1')}</p>
            <p>{t('product_description_text_2')}</p>
          </div>
        )}
        
        {tabView === 'reviews' && (
          <div className="py-6">
            <div className="flex items-center mb-6">
              <div className="flex-1">
                <div className="flex items-center">
                  <p className="text-3xl font-medium">4.2</p>
                  <p className="text-sm text-gray-500 ml-2">{t('product_out_of')}</p>
                </div>
                <div className="flex mt-1">
                  {[...Array(4)].map((_, i) => (
                    <img key={i} src={assets.star_icon} alt="Star" className="w-4" />
                  ))}
                  <img src={assets.star_dull_icon} alt="Star" className="w-4" />
                </div>
                <p className="text-sm text-gray-500 mt-1">{t('product_based_on_reviews')}</p>
              </div>
              
              <div className="flex-1">
                <button className="bg-black text-white px-6 py-2 text-sm rounded-sm">{t('product_write_review')}</button>
              </div>
            </div>
            
            <div className="border-t py-4">
              <p className="text-gray-600 text-sm">{t('product_no_reviews')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Displaying related products */}
      <div className="mt-16">
        <h2 className="text-2xl font-medium mb-8">{t('product_you_might_like')}</h2>
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
          productId={productId}
        />
      </div>
    </div>
  );
};

export default Product;