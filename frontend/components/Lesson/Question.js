import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Jumbotron, FormControl, FormGroup, ControlLabel, Radio, Checkbox } from 'react-bootstrap';
import Results from './ResultsQuiz.js';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null, 
      answer: null,
      relatedSlides: null,
      mcType: null,
      studentAnswers: undefined,
      results: false
    }
    this.answerChange = this.answerChange.bind(this);
  }

  answerChange(e) {
    let answers = this.state.studentAnswers;
    let val = e.target.value;
    let temp = [];
    if (this.state.mcType !== "false" && answers) {
      answers = `${answers}, ${val}`
    } else {
      answers = val;
    }
    this.setState({
      studentAnswers: answers
    })
  }

  componentWillMount() {
    var answer;
    if (this.props.question.length) {
      if (this.props.mcType === false) {
        answer = this.props.answer;
      } else {
        answer = this.props.answer
      }
      this.setState({
        question: this.props.question,
        answer: answer,
        relatedSlides: this.props.relatedSlides,
        mcType: this.props.mcType
      })
    }
  }


  render() {
    return (
      <div className="question-view">
        {this.state.question ?  
        <div>     
          <h3>{this.state.question}</h3>
          {this.state.mcType === "false" ? 
            <FormGroup controlId="formControlsShortAnswer">
              <ControlLabel>Short Answer</ControlLabel>
              <FormControl 
                componentClass="textarea" 
                placeholder="Type your answer here" 
                value={this.state.studentAnswer}
                onChange={this.answerChange}
              />
              <Button onClick={() => this.props.saveAnswer(this.state.studentAnswers)}>Submit Answer</Button>
            </FormGroup> : 
            <div>
              <FormGroup controlId="formControlsMultipleChoice">
              {this.state.mcType === 'checkbox' ? 
                  this.state.answer.map((answer, index) => {
                    if (answer.answer) {
                      return (
                        <Checkbox key={index} value={answer.answer} onChange={this.answerChange}>{answer.answer}</Checkbox>
                      )
                    }
                  })
                : 
                  this.state.answer.map((answer, index) => {
                    if (answer.answer) {
                      return (
                        <Radio key={index} value={answer.answer} onChange={this.answerChange}>{answer.answer}</Radio>
                      )
                    }
                  })
              } 
              </FormGroup>
              <div>
                <Button onClick={() => this.props.saveAnswer(this.state.studentAnswers)}>Submit Answer</Button>
              </div>
            </div>
          } </div> : <div></div> 
        }
      </div>
    ) 
  }
}

export default QuestionView;