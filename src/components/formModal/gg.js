
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import SubTitle from "../../components/SubTitle";
import Title from "../../components/Title";
import { BsArrowRight } from "react-icons/bs";
import { hover } from "../../styles/globalStyleVars";
import closeBtn from "../../public/images/static/close.svg";
import banner from "../../public/images/dynamic/about-banner.jpg";
import Upload from "../../public/images/static/upload.svg";
import { BASE_URL } from "../../pages/api/config";
import ReactHtmlParser from "react-html-parser";
import { wrapper } from "../../pages/api/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  callCareerApi,
  callCareerForm,
} from "../../pages/api/redux/actions/career";
import { END } from "redux-saga";
import { createStructuredSelector } from "reselect";
import { selectCareerData } from "../../pages/api/redux/selectors/career";
import { connect } from "react-redux";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { BiError } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ApiServices } from "../../pages/api/network/ApiServices";
import send from "../../public/images/static/send.svg";
import axios from "axios";

const Lists = ({ careerData, callCareerForm }) => {
  const [show, setShow] = useState(false);
  const [showCv, setShowCv] = useState(false);
  const [item, setItem] = useState("");
  const [contactFormData, setContactFormData] = useState({
    name: "",
    contact: "",
    email: "",
    profession: "",
    address: "",
    message: "",
  });
  const [files, setFiles] = useState(null);

  useEffect(() => {
    console.log(files && files[0]);
  }, [files]);



  const data =
    careerData && careerData?.find((item) => item?.slug === "top_banner");
  const careers =
    careerData &&
    careerData?.filter((item) => item?.slug !== "top_banner" && item);

  useEffect(() => {
    const current = careers && id && careers?.find((item) => item._id === id);
    if (current?._id) {
      handleShow(current);
    } else {
      router.push("/career");
    }
  }, [id]);



 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(contactFormData).map(([key, value]) => {
      formData.append(`${key}`, value);
    });

    files.map((file) => formData.append("file", file));

    axios({
      method: "post",
      url: `${BASE_URL}${ApiServices.DROP_CV_POST}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    toast.success("Sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // icon: <BiError />,
    });


  const handleChange = (e) => {
    setContactFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const filesArray = [...e.target.files];
    const isValidFile = filesArray
      .map((file) => isPdfOrImg(file.name))
      .every(Boolean);
    // console.log(e.target.files);

    if (isValidFile) {
      setFiles([...e.target.files]);
    } else {
      toast.error(
        "Please select one of these format pdf/jpg/jpeg/png/doc/docx/",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          icon: <BiError />,
        }
      );
    }
  };

  return (
    <>
      <StyledLists className="pt-100 pb-100">
        <Container>
          <Row>
            <Col sm={7} className="title-left">
              <SubTitle text={data?.title} />
              <Title
                fontSize={"40"}
                lineHeight={"44"}
                fontWeight={"bold"}
                text={data?.sub_title}
              />
              {ReactHtmlParser(data?.description)}
            </Col>

            <Col sm={5} className="form-right">
              <div className="form-right__box">
             
                <button
             
                  onClick={(e) => handleCvShow()}
                >
                  submit
                </button>
             
              </div>
            </Col>
          </Row>
          <Row className=" pt-100">
            <div className="career-lists">
          
              {careerData &&
                careerData.length > 0 &&
                careerData?.map((element, index) => {
                  // console.log('element----', element)
                  return element?.slug !== "top_banner" ? (
                    <div
                      className="career-lists__single"
                      key={element?._id}
                      onClick={() => handleShow(element)}
                    >
                      <h3>{index}</h3>
                      <h5>{element?.date}</h5>
                      <h4>{element?.title}</h4>
                      <h6>{element?.sub_title}</h6>
                      <p>
                        Read more <BsArrowRight />
                      </p>
                    </div>
                  ) : (
                    ""
                  );
                })}
            </div>
          </Row>
        </Container>
      </StyledLists>
      <Modal className="team-detail" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <img src={closeBtn} alt="" />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content-wrap">
            <div className="news-detail">
              <h2>{item?.title}</h2>
              <h4>{item?.date}</h4>

              <hr />
              {ReactHtmlParser(item?.description)}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal className="team-detail" show={showCv} onHide={handleCvClose}>
        <Modal.Header closeButton>
          <img src={closeBtn} alt="" />
        </Modal.Header>
        <Modal.Body>
          <StyledForm className="pt-10 submit-profile">
            <h3>Submit your information</h3>
            <div className="from-wrap">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={4}>
                    <Form.Group controlId="name">
                      <Form.Control
                        // required
                        type="text"
                        placeholder="Full Name:"
                        name="name"
                        // value={contactFormData?.name}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <Form.Group controlId="name">
                      <Form.Control
                        // required
                        type="text"
                        placeholder="Contact:"
                        name="contact"
                        // value={contactFormData?.name}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={4}>
                    <Form.Group controlId="email">
                      <Form.Control
                        pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
                        type="email"
                        placeholder="Email:"
                        name="email"
                        // value={contactFormData?.email}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6} className="row-two">
                    <Form.Group controlId="subject">
                      <Form.Control
                        // required
                        type="text"
                        placeholder="Profession: ex- welder, pipe fitter "
                        name="profession"
                        // value={contactFormData?.subject}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6} className="row-two">
                    <Form.Group controlId="subject">
                      <Form.Control
                        type="text"
                        placeholder="Address:"
                        name="address"
                        // value={contactFormData?.subject}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={12}>
                    <Form.Group controlId="textarea">
                      <Form.Control
                        placeholder={"Message:"}
                        as="textarea"
                        name="message"
                        // value={contactFormData?.message}
                        onChange={(e) => handleChange(e)}
                        rows={4}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={12}>
                    <div className="file-upload-container">
                      <Form.Group>
                        <Form.Label
                          className="file-upload"
                          htmlFor="file-upload"
                        >
                          <span className="icon">
                            <FaCloudUploadAlt />
                          </span>
                          Browse files
                          <span>5 files upto 20Mb</span>
                          <span className="file-type">
                            jpg, jpeg, pdf, doc, docx, png
                          </span>
                          <span className="file-list">
                            {/* {files &&
                              files?.map((file, idx) => (
                                <span key={idx}>{file.name}</span>
                              ))} */}
                          </span>
                        </Form.Label>
                        <Form.Control
                          id="file-upload"
                          type="file"
                          max={5}
                          accept="application/pdf,.doc,.docx, image/png,.jpg,.jpeg"
                          onChange={handleFileChange}
                          multiple
                        />
                      </Form.Group>
                    </div>
                  </Col>

                  <Col className="justify-content-end d-flex">
                    <button type="submit">
                      Submit <img src={send} alt="send" className="mb-1" />
                    </button>
                  </Col>
                </Row>
              </Form>
            </div>
          </StyledForm>
        </Modal.Body>
      </Modal>
    </>
  );