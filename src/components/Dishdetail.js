import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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
      render(){
          return<div>
               <Button outline onClick={this.toggleModal} ><span className=" fa fa-pencil fa-lg"></span>Submit Comment</Button>
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