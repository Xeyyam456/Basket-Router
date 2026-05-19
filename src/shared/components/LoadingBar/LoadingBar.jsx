import './LoadingBar.css'

function LoadingBar() {
  return (
    <>
      <div className="loading-bar">
        <div className="loading-bar__track">
          <div className="loading-bar__fill" />
          <div className="loading-bar__comet" />
        </div>
      </div>

      <div className="loading-center">
        <div className="loading-ring">
          <div /><div /><div /><div />
        </div>
        <p className="loading-center__text">Loading...</p>
      </div>
    </>
  )
}

export default LoadingBar
