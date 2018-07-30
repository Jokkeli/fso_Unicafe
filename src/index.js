import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Statistic = ({luku, teksti, liite}) => <tr><td>{teksti}:</td><td>{luku}{liite}</td></tr>

const Statistics = ({hyva, neutraali, huono}) => (
    <div>
        <table>
            <tbody>
            <Statistic luku = {hyva} teksti = "Hyvä" liite = ""/>
            <Statistic luku = {neutraali} teksti = "Neutraali" liite = ""/>
            <Statistic luku = {huono} teksti = "Huono" liite = ""/>
            <Statistic luku = {(huono*-1 + hyva) / (huono + hyva + neutraali)} teksti = "Keskiarvo" liite = ""/>
            <Statistic luku = {hyva / (huono + hyva + neutraali) * 100} teksti = "Positiivisia" liite = "%"/>
            </tbody>
        </table>
    </div>
)

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
      }
    }
  
    annaPalaute = (palaute) => {
        return () => {
          this.setState({ 
                [palaute]: this.state[palaute] +1 
            })
        }
    }
    render() {

        const statistiikka = () => {
            if(this.state.hyva === 0 && this.state.neutraali === 0 && this.state.huono === 0) {
                return (
                    <div>
                        <h1> Statistiikka: </h1>
                        <p> Yhtäkään palautetta ei ole annettu. </p>
                    </div>
                )
            }
            return (
                <div>
                        <h1> Statistiikka: </h1>
                        <Statistics hyva = {this.state.hyva} neutraali = {this.state.neutraali} huono = {this.state.huono} />
                    </div>
            )
        }
        return (
          <div>
            <div>
              <h1> Anna palautetta: </h1>
              <Button
                handleClick={this.annaPalaute("hyva")}
                text = "Hyvä" />
              <Button
                handleClick={this.annaPalaute("neutraali")}
                text = "Neutraali" />
              <Button
                handleClick={this.annaPalaute("huono")}
                text = "Huono" />
              <br />
              <br />
              <div> {statistiikka()} </div>
            </div>
          </div>
        )
      }
    }

        

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )