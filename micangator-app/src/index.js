import React from 'react';
import { GithubPicker } from 'react-color';
import ReactDOM from 'react-dom';
import './index.css';

class MicangatorMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {nome: '', qtdCores: 1, tamanho: "P", cores: ['#fff', '#fff', '#fff']};

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


    renderUnidade(colorValue, index) {
        let id = parseInt(Math.random() * 100000);
        let chave = id + "_U";
        return <div style={{background: colorValue, borderColor: colorValue, color: colorValue, width: '32px', height: '32px', borderRadius: '50%', display: 'inline-block', textAlign: 'center', lineHeight: '30px'}} key={chave}>A</div>   
    }
    
    renderUnidadesBlank(count) {
        let arr = this.range(0, count - 1);
        let content = arr.map((index) => this.renderUnidadeBlank(index + "_B"));
        return content;
    }
    
    renderUnidadeBlank(id) {
        return <div style={{background: 'white', borderColor: 'white', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'inline-block', border: '1px solid', textAlign: 'center', lineHeight: '30px'}} key={id}>A</div>   
    }

    renderNome() {
        let arrNome = this.state.nome.split("");
        let content = arrNome.map((letra, index) => <div style={{borderColor: '#AAAAAA', color: 'red', width: '30px', height: '30px', borderRadius: '15%', display: 'inline-block', border: '1px solid', textAlign: 'center', lineHeight: '30px'}} key={index}><b>{letra}</b></div>)
        return content;                            
    }

    renderAmostra() {
        let qtdCores = parseInt(this.state.qtdCores);
        let fator = 1;
        if (this.state.tamanho == "M") {
            fator = 2;
        } else if (this.state.tamanho == "G"){
            fator = 3;
        }        
        let totalUnits = (fator * 2) + this.state.nome.length;

        let contentBlank;
        if (this.state.nome.length > 0) {
            contentBlank = this.renderUnidadesBlank(totalUnits - 2);
        }
        return ( <div>{this.renderUnidades("E", fator)}
                {this.renderNome()}
                {this.renderUnidades("D", fator)}<br/>
                {this.renderUnidade(this.state.cores[this.getColorIndex(qtdCores)], qtdCores)}    
                {contentBlank}
                {this.renderUnidade(this.state.cores[this.getColorIndex(qtdCores)], qtdCores)}<br/>
                {this.renderUnidades("F", fator)}    
            </div>);
    };

    range(start, end) {
        if(start == end) return [start];
        return [start, ...this.range(start + 1, end)];
    };

    renderUnidades(lado, fator) {
        let qtdCores = parseInt(this.state.qtdCores);
        let arr;
        if (lado == "E") {
            arr = this.range(0, (/*qtdCores * */fator - 1)) ;
        } else if (lado == "D"){
            arr = this.range(0, (/*qtdCores * */fator - 1)).reverse() ;
            //arr = this.range(/*qtdCores * */fator, (/*qtdCores * */2) * fator - 1);
        } else {
            arr = this.range(1, (/*qtdCores * */2) * fator + this.state.nome.length);
        } 
        let content = arr.map((index) => this.renderUnidade(this.state.cores[this.getColorIndex(index, lado)], index));
        return content;
    }

    getColorIndex(value, lado) {
        let qtdCores = parseInt(this.state.qtdCores);
        if (lado == "F") {
            return value % qtdCores;
        } else {
            let end = qtdCores - 1;
            let quocient = Math.floor(value / qtdCores);
            return (value % qtdCores - end + quocient % 2 * end) * Math.pow(-1, quocient + 1);
        }
    };

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
                <div>Amostra:<p/>{this.renderAmostra()}</div>
            </form>
        );
    }

}

// ========================================

ReactDOM.render(
    <MicangatorMain />,
    document.getElementById('root')
);
