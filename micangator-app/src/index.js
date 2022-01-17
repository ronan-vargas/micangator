import React from 'react';
import { GithubPicker } from 'react-color';
import ReactDOM from 'react-dom';
import './index.css';

class MicangatorMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {nome: '', qtdCores: 1, tamanho: "P", cores: ['#fff', '#000', '#fff']};

        this.handleNomeChange = this.handleNomeChange.bind(this);
        this.handleQtdCoresChange = this.handleQtdCoresChange.bind(this);
        this.handleTamanhoChange = this.handleTamanhoChange.bind(this);
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

    handleTamanhoChange(event) {
        this.setState({...this.state, tamanho: event.target.value});
    };
    
    handleChangecor0Complete = (color) => {
        this.setState({...this.state, cores: [color.hex, this.state.cores[1], this.state.cores[2]]});
    };

    handleChangecor1Complete = (color) => {
        this.setState({...this.state, cores: [this.state.cores[0], color.hex, this.state.cores[2]]});
    };

    handleChangecor2Complete = (color) => {
        this.setState({...this.state, cores: [this.state.cores[0], this.state.cores[1], color.hex]});
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

    renderTamanho() {
        return (
            <select value={this.state.tamanho} onChange={this.handleTamanhoChange}>
                <option defaultValue="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
            </select>
        );
    };


    renderUnidade(colorValue) {
        return <div style={{background: colorValue, borderColor: colorValue, color: colorValue, width: '30px', height: '30px', borderRadius: '50%', display: 'inline-block', textAlign: 'center', lineHeight: '30px'}}>A</div>   
    }
    
    renderUnidadeBlank() {
        return <div style={{background: 'white', borderColor: 'white', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'inline-block', textAlign: 'center', lineHeight: '30px'}}>A</div>   
    }

    renderNome() {
        let arrNome = this.state.nome.split("");
        let content = arrNome.map((letra, index) => <div style={{borderColor: '#AAAAAA', width: '30px', height: '30px', borderRadius: '15%', display: 'inline-block', border: '1px solid', textAlign: 'center', lineHeight: '30px'}} key={index}><b>{letra}</b></div>)
        return content;                            
    }

    renderAmostra() {
        //alert(this.state.qtdCores);
        if (this.state.qtdCores == 1) {
            return (<div>{this.renderUnidade(this.state.cores[0])}
            {this.renderNome()}
                    {this.renderUnidade(this.state.cores[0])}</div>);
        }
        if (this.state.qtdCores == 2) {
            return (<div>{this.renderUnidade(this.state.cores[1])}
            {this.renderUnidade(this.state.cores[0])}
            {this.renderNome()}
            {this.renderUnidade(this.state.cores[0])}
                    {this.renderUnidade(this.state.cores[1])}</div>);
        }
        return ( <div>{this.renderUnidade(this.state.cores[2])}
            {this.renderUnidade(this.state.cores[1])}
            {this.renderUnidade(this.state.cores[0])}
            {this.renderNome()}
            {this.renderUnidade(this.state.cores[0])}
            {this.renderUnidade(this.state.cores[1])}
            {this.renderUnidade(this.state.cores[2])}</div>);       
                    
    };

    range(start, end) {
        if(start === end) return [start];
        return [start, ...range(start + 1, end)];
    }

    renderUnidades(lado) {
        qtdCores = this.state.qtdCores;
        if (lado == 'E') {
            arr = [...Array(qtdCores)..keys()];

        } else {
            arr = range(qtdCores, qtdCores * 2)
        }
    }

    getColorIndex(value) {
        qtdCores = this.state.qtdCores;
        return (value % qtdCores - (qtdCores - 1) + (value / qtdCores) % (qtdCores - 1) * (qtdCores - 1)) * Math.pow(-1, value / qtdCores + 1);
    }

    render() {
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
                    <label>Tamanho: {this.renderTamanho()}</label>
                </div>
                <p/>
                <div>
                    <label>Cor 1:</label>
                </div>
                <p/>
                <div>
                    <GithubPicker color={this.state.cores[0]} onChangeComplete={ this.handleChangecor0Complete }/>
                </div>
                <p/>
                <div hidden={this.state.qtdCores < 2}>
                    <label>Cor 2:</label>
                    <p/><GithubPicker color={this.state.cores[1]} onChangeComplete={ this.handleChangecor1Complete }/>
                </div>
                <p/> 
                <div hidden={this.state.qtdCores < 3}>
                    <label>Cor 3:</label>
                    <p/><GithubPicker color={this.state.cores[2]} onChangeComplete={ this.handleChangecor2Complete }/>
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
