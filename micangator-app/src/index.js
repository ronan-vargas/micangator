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
                <option defaultValue="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        );
    };
    
    renderUnidade(colorValue) {
        /*let content = <div style={{background: colorValue, width: '25px', height: '25px', borderRadius: '50%', display: 'inline-block'}}/> 
        content.append(<h1>HelloWorld</h1>)
        return content;*/    
        return <div style={{background: colorValue, borderColor: colorValue, width: '30px', height: '30px', borderRadius: '50%', display: 'inline-block', textAlign: 'center'}}> </div>   
    }

    renderNome() {
        let arrNome = this.state.nome.split("");
        let content = arrNome.map((letra, index) => <div style={{borderColor: '#AAAAAA', width: '30px', height: '30px', borderRadius: '50%', display: 'inline-block', borderStyle: 'solid', textAlign: 'center'}} key={index}>{letra}</div>)
        return content;                            
    }

    renderAmostra() {
        //alert(this.state.qtdCores);
        if (this.state.qtdCores == 1) {
            return (<div>{this.renderUnidade(this.state.cor1)}
            {this.renderNome()}
                    {this.renderUnidade(this.state.cor1)}</div>);
        }
        if (this.state.qtdCores == 2) {
            return (<div>{this.renderUnidade(this.state.cor2)}
            {this.renderUnidade(this.state.cor1)}
            <label>{this.state.nome}</label>
            {this.renderUnidade(this.state.cor1)}
                    {this.renderUnidade(this.state.cor2)}</div>);
        }
        return ( <div>{this.renderUnidade(this.state.cor3)}
            {this.renderUnidade(this.state.cor2)}
            {this.renderUnidade(this.state.cor1)}
            <label>{this.state.nome}</label>
            {this.renderUnidade(this.state.cor1)}
            {this.renderUnidade(this.state.cor2)}
            {this.renderUnidade(this.state.cor3)}</div>);       
                    
    };

    render() {
        //alert("Render");
        //return(<h1>"Hello World"</h1>);
        const appName = "Miçangator";
        return(
            <form onSubmit={this.handleSubmit()}>
                <div className="appName">
                    <h1>{appName}</h1>
                </div>
                
                <p/>
                <div>
                    <label>Nome:
                        <input type="text" value={this.state.nome} onChange={this.handleNomeChange}/>
                    </label>
                </div>
                <p/>
                <div>
                    <label>Qtd. Cores: {this.renderQtdCores()}</label>
                </div>
                <p/>
                <div>
                    <label>Cor 1:</label>
                </div>
                <p/>
                <div>
                    <GithubPicker color={this.state.cor1} onChangeComplete={ this.handleChangeCor1Complete }/>
                </div>
                <p/>
                <div hidden={this.state.qtdCores < 2}>
                    <label>Cor 2:</label>
                    <p/><GithubPicker color={this.state.cor2} onChangeComplete={ this.handleChangeCor2Complete }/>
                </div>
                <div hidden={this.state.qtdCores < 3}>
                    <label>Cor 3:</label>
                    <p/><GithubPicker color={this.state.cor3} onChangeComplete={ this.handleChangeCor3Complete }/>
                </div>
                <p/>
                <div>Amostra:{this.renderAmostra()}</div>
            </form>
        );
    }

}

// ========================================

ReactDOM.render(
    <MicangatorMain />,
    document.getElementById('root')
);
