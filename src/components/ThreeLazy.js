import React, {
    useRef,
    useState,
    useEffect,
    Suspense,
    lazy,
    Fragment,
  } from 'react'
  
  const ThreeCanvas = lazy(() => import('./three-canvas'))
  
  const ThreeLazy = () => {
    const ref = useRef(null)
    const [isMounted, setIsMounted] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)
    const [okToAnimate, setOkToAnimate] = useState(true)
  
    useEffect(() => {
      setIsMounted(true)
    }, [])
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setOkToAnimate(true)
          } else {
            setOkToAnimate(false)
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        }
      )
      if (ref && ref.current) {
        observer.observe(ref.current)
      }
    }, [isMounted, okToAnimate])
  
    return (
      <Fragment>
        {!isMounted ||
        navigator?.connection?.saveData ||
        !matchMedia('(min-width: 368px)').matches ? null : (
          <Suspense fallback={null}>
            <div
              ref={ref}
              className={`absolute w-full h-full transition-opacity delay-500 duration-1000 ${
                hasLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ThreeCanvas
                okToAnimate={okToAnimate}
                onCreated={() => setHasLoaded(true)}
              />
            </div>
          </Suspense>
        )}
      </Fragment>
    )
  }
  
  export default ThreeLazy
  