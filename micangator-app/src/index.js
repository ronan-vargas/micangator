import React from 'react';
import { GithubPicker } from 'react-color';
import ReactDOM from 'react-dom';
import './index.css';

class MicangatorMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {nome: '', qtdCores: 1, cor1: '#fff', cor2: '#000', cor3: '#fff'};

        this.handleNomeChange = this.handleNomeChange.bind(this);
        this.handleQtdCoresChange = this.handleQtdCoresChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {

    };

    handleNomeChange(event) {
        this.setState({...this.state, nome: event.target.value});
    };

    handleQtdCoresChange(event) {
        this.setState({...this.state, qtdCores: event.target.value});
    };
    
    handleChangeCor1Complete = (color) => {
        this.setState({...this.state, cor1: color.hex });
    };

    handleChangeCor2Complete = (color) => {
        this.setState({...this.state, cor2: color.hex });
    };

    handleChangeCor3Complete = (color) => {
        this.setState({...this.state, cor3: color.hex });
    };


    renderQtdCores() {
        return (
            <select value={this.state.qtdCores} onChange={this.handleQtdCoresChange}>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        );
    };
    
    renderAmostra() {
        if (this.state.qtdCores === 1) {
            return (<div><p style="color=red">_____</p>
            <label>{this.state.nome}</label>
            <label background-color={this.state.cor1}>    </label></div>);
        }
        /*if (this.state.qtdCores === 2) {
            return (<div><label color={this.state.cor1}>   </label>
            <label color={this.state.cor2}>   </label>
            <label>{this.state.nome}</label>
            <label color={this.state.cor2}>   </label>
            <label color={this.state.cor1}>   </label><div>);
        }*/
        return ( <div><label background-color="{this.state.cor1}">   </label>
            <label background-color={this.state.cor2}>   </label>
            <label background-color={this.state.cor3}>   </label>
            <label>{this.state.nome}</label>
            <label background-color={this.state.cor3}></label> 
            <label background-color={this.state.cor2}></label>
            <label background-color={this.state.cor1}>   </label></div>);       
                    
    };

    render() {
        const appName = "Miçangator";
        return(
            <form onSubmit={this.handleSubmit()}>
                <div className="appName"><h1>{appName}</h1></div>
                <p><label>Nome: <input type="text" value={this.state.nome} onChange={this.handleNomeChange}/></label></p>
                <p><label>Qtd. Cores: {this.renderQtdCores()}</label></p>
                <div><p><label>Cor 1:</label></p><p><GithubPicker color={this.state.cor1} onChangeComplete={ this.handleChangeCor1Complete }/></p></div>
                <div hidden={this.state.qtdCores < 2}><p><label>Cor 2:</label></p><p><GithubPicker color={this.state.cor2} onChangeComplete={ this.handleChangeCor2Complete }/></p></div>
                <div hidden={this.state.qtdCores < 3}><p><label>Cor 3:</label></p><p><GithubPicker color={this.state.cor3} onChangeComplete={ this.handleChangeCor3Complete }/></p></div>
                <div><p>Amostra:</p><p>{this.renderAmostra()}</p></div>
            </form>
        );
    }

}

// ========================================

ReactDOM.render(
    <MicangatorMain />,
    document.getElementById('root')
);
