import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class TravelGuide extends Component {
  state = {packagesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPackagesList()
  }

  getPackagesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.packages.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        description: eachItem.description,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        packagesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSuccessView = () => {
    const {packagesList} = this.state
    return (
      <ul className="packages-list-container">
        {packagesList.map(eachPackage => (
          <li key={eachPackage.id} className="list-item">
            <img
              src={eachPackage.imageUrl}
              alt={eachPackage.name}
              className="place-image"
            />
            <div className="package-details">
              <h1 className="package-name">{eachPackage.name}</h1>
              <p className="package-description">{eachPackage.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderInProgressView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPageViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="page-container">
        <h1 className="page-title">Travel Guide</h1>
        {this.renderPageViews()}
      </div>
    )
  }
}

export default TravelGuide
