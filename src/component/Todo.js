import { React, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

import {

    Button,
    Card,
    CardHeader,
    CardBody,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip,
    Form,

} from "reactstrap";
let temptaskdata
export default function Todo() {
    const [task, addtask] = useState()
    const [showTask, setshowtask] = useState()
    const [count, setcount] = useState()
    const [countsearch, setcountsearch] = useState()
    const [editTask, seteditTask] = useState('')
    const [editTodoData, seteditTodoData] = useState()
    const [resetsearch, setresetsearch] = useState(false)
    const [check, setCheck] = useState(false)
    const [completedtodo, setcompletedtodo] = useState([])





    const edit = (item) => {
        seteditTask(item.id)
        seteditTodoData(item.task)
    }


    const addTask = (e) => {
        e.preventDefault()
        var input = document.getElementById("todoinput")
        if (task === undefined) return true
        axios.post(`http://localhost:3000/tasks`, { task: task, status: "pending" }).then((response) => {
            if (response.status == "201") {
                toast.success("Task added successfully");
                input.value = null
                setcount()
                addtask()
            }
            else toast.error("somenthing went wrong")
        })
    }

    useEffect(() => {

    })
    const editaddtask = (id) => {
        axios.patch(`http://localhost:3000/tasks/${id}`, {
            task: editTodoData
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Task edited successfully")
                    seteditTodoData("")
                }
            }).catch((err) => {
                toast.error("something went wrong")
            })
    }

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:3000/tasks/${id}`).then((res) => {
            if (res.status) {
                setcount()
                toast.error("Task deleted successfully")
                return true
            }
        })
    }
    const showTaskk = () => {
        axios.get(`http://localhost:3000/tasks`).then((res) => {


            setshowtask(res.data)
            temptaskdata = showTask
            setcount(res.data.length)
        })
    }
    useEffect(() => {
        showTaskk()
    }, [editTodoData, count])

    const resetSearch = () => {
        var input = document.getElementById("inputsearch")
        input.value = null
        setresetsearch(false)
        setshowtask(temptaskdata)

    }


    const searchTasks = (e) => {
        let tempSearchdata = showTask.filter((item) => {
            return ((item.task).toLowerCase()).includes((e.target.value).toLowerCase())
        })
        setshowtask(tempSearchdata)
        setcountsearch(tempSearchdata.length)
    }

    const sortTask = () => {
        axios.get(`http://localhost:3000/tasks?_sort=task&_order=accending`).then((res) => {
            setshowtask(res.data)
            temptaskdata = showTask
        })
    }
    const checked = (item, e) => {
        let tempData = completedtodo
        if (e.target.checked) {
            tempData.push(item)
        }
        else if (!e.target.checked) {
            let temp = tempData.filter((x) => {
                return x.id !== item.id
            })
            console.log("temp", temp);
            tempData = temp
        }
        console.log("completedtodo=====>", tempData)

        if (tempData.length > 0) {
            setCheck(true)
        }
        else setCheck(false)

        setcompletedtodo(tempData)
    }

    const markasDone = () => {
        completedtodo.forEach(async (item) => {
            if(item.status==="pending"){
            try {
                const res = await axios.patch(`http://localhost:3000/tasks/${item.id}`, {
                    status: "completed"
                });
                if (res.status === 200) {
                    toast.success("task Completed");
                    showTaskk()
                    document.getElementById(item.id).checked = false
                    // setcompletedtodo([])
                }
            } catch (err) {
                toast.error("something went wrong");
            }
        }
        else if(item.status==="completed") toast.error("Already marked ")

        })

    }
    const DeteteAll= () => {
        completedtodo.forEach(async (item) => {
            axios.delete(`http://localhost:3000/tasks/${item.id}`).then((res) => {
            if (res.status) {
                setcount()
               
                return true
            }
        })
        })
        toast.success("Task deleted successfully")
        }

    return (
        <div className="content">
            <Row>
                <Col lg="12" md="12">
                    <Form onSubmit={(e) => addTask(e)}>
                        <div className='d-flex  my-3 pb-3'>
                            <Input type="text"
                                className='form-control cursor-pointer'
                                id="todoinput"
                                placeholder='Add your task from here ..'
                                onChange={e => { addtask(e.target.value); seteditTask("") }} />
                        </div>
                    </Form>
                </Col>
                <Col lg="12" md="12">
                    <Card className="card-tasks">
                        <CardHeader>
                            <Row>
                                <Col className=" ms-5">
                                    <h4 className="title d-inline">Tasks({resetsearch ? countsearch : count})</h4>
                                </Col>
                                <Col >
                                    {check ?
                                        <>

                                            <Button
                                                className='sort-btn'
                                                style={{ color: "white" }}
                                                color="link"
                                                type="button"
                                                onClick={e => markasDone()}
                                            >
                                                Mark done
                                            </Button>
                                            <Button
                                                className='sort-btn'
                                                style={{ color: "white" }}
                                                color="link"
                                                type="button"
                                                onClick={e => DeteteAll()}
                                            >
                                                Detete All
                                            </Button>
                                        </>
                                        :
                                        <Button
                                            className='sort-btn'
                                            style={{ color: "white" }}
                                            color="link"
                                            type="button"
                                            onClick={e => sortTask()}
                                        >
                                            Sort
                                        </Button>
                                    }
                                </Col>

                                <Col className="d-flex justify-content-end">
                                    <Input type='text' id='inputsearch' placeholder='Search Tasks.....' onChange={(e) => { searchTasks(e); setresetsearch(true) }} />
                                    {resetsearch && <Button style={{ marginLeft: "-50px", marginTop: "1px" }} onClick={() => resetSearch()} color="link" type='button'><i className='tim-icons icon-simple-remove' /></Button>}
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <div className="table-full-width table-responsive">
                                <Table>
                                    <tbody>
                                        {showTask?.length <= 0 && (
                                            <tr>
                                                <td>
                                                    <span className='fs-15  mt-5'> Nothing to display ......  </span>
                                                </td>
                                            </tr>

                                        )}
                                        {showTask && showTask.map((item) => {
                                            return (
                                                <tr key={item.id} className="">
                                                    <td className='w-25'>
                                                        <FormGroup check>
                                                            <Label check>
                                                                {(editTask !== item.id) &&
                                                                    <>
                                                                        <Input defaultValue="" id={item.id} type="checkbox" onClick={(e) => checked(item, e)} />
                                                                        <span className="form-check-sign">
                                                                            <span className="check" />
                                                                        </span>
                                                                    </>
                                                                }
                                                            </Label>
                                                        </FormGroup>
                                                    </td>
                                                    <td >
                                                        {
                                                            editTask === item.id ? (
                                                                <Input type="text"
                                                                    className=''
                                                                    value={editTodoData}
                                                                    onChange={(e) => seteditTodoData(e.target.value)}
                                                                />
                                                            ) : (
                                                                <p className="text-muted ms-5 ">
                                                                    {item.task}
                                                                </p>
                                                            )
                                                        }
                                                    </td>
                                                    <td>

                                                        {(editTask !== item.id) &&
                                                            <>

                                                                <p className={item.status === "pending" ? 'pending' : 'text-success'}>{item.status}</p>
                                                            </>
                                                        }
                                                    </td>
                                                    <td className="td-actions text-right w-50">
                                                        {editTask === item.id ? (
                                                            <>
                                                                <Button
                                                                    color="link"
                                                                    type="button"
                                                                    onClick={() => { editaddtask(item.id); edit(item.id + "0") }}
                                                                >
                                                                    <i className="tim-icons icon-check-2 text-success" />
                                                                </Button>
                                                                <Button
                                                                    color="link"
                                                                    type="button"
                                                                    onClick={() => edit(item.id + "0")}
                                                                >
                                                                    <i className="tim-icons icon-simple-remove text-danger" />
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Button
                                                                    color="link"
                                                                    id="edit"
                                                                    type="button"
                                                                    disabled={check}
                                                                    onClick={() => edit(item)}
                                                                >
                                                                    <i className="tim-icons icon-pencil text-success" />
                                                                </Button>
                                                                <UncontrolledTooltip
                                                                    delay={0}
                                                                    target="edit"
                                                                    placement="right"
                                                                >
                                                                    Edit Task
                                                                </UncontrolledTooltip>
                                                                <Button
                                                                    color="link"
                                                                    id="delete"
                                                                    type="button"
                                                                    disabled={check}
                                                                    onClick={e => deleteTodo(item.id)}
                                                                >

                                                                    <i className="tim-icons icon-trash-simple text-danger" />

                                                                </Button>
                                                                <UncontrolledTooltip
                                                                    delay={0}
                                                                    target="delete"
                                                                    placement="right"
                                                                >
                                                                    Delete Task
                                                                </UncontrolledTooltip>
                                                            </>


                                                        )}


                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
