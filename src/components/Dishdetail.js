import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,Col, ModalHeader, ModalBody,Row,Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
      }
      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
      render(){
          return<div>
               <Button outline onClick={this.toggleModal} ><span className=" fa fa-pencil fa-lg"></span>Submit Comment</Button>
               <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating"  md={2}>Rating</Label>
                                <Col md={10}>
                                <Control.select model=".rating" name="rating"
                                        className="form-control" validators={{required}} >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required\n',
                                        }}
                                     />
                                    </Control.select>
                                     </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Your Name</Label>
                                <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                        placeholder="Your name"
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required\n',
                                            minLength: 'Must be greater than 2 characters\n',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                    </Col>
                            </Row>
                            <Row className="form-group" >
                            <Label htmlFor="comment"  md={2}>Comment</Label>
                                <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" validators={{required}}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required\n',
                                        }}
                                     />                                    
                                     </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" value="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
          </div>
      }
}

 
function RenderComments({comments}){
        if(comments !=null){
        return(
            <div  className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className='list-unstyled'>
        {comments.map((i)=>{
            return(
                <li key={i.id}>
                <p> {i.comment} </p>
                <p>--{i.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(i.date)))}</p>
                </li>
            );
        })}
        </ul>
        <CommentForm/>
        </div>
        );
}
else
    return<div></div>
}

    function RenderDish({dish}){
            console.log("henaaaaaaaaaaaaaa")
                return(
                    <div  className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg  top src={dish.image} alt={dish.name}></CardImg>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </div>
            );
    
    }


const DishDetails = (props) => {
    console.log("yaraaab")
        if (props != null)
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>

            </div>
            </div>
        );
        else 
            return<div></div>
}

export default DishDetails;