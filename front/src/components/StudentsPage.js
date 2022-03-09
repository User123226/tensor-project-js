import styled from "styled-components";
import read from "../actions/read.js";
import React from "react";
import create from "../actions/create.js";
import uuid from "react-uuid/uuid.js";
import Delete from "../actions/delete.js";
import Popup from 'reactjs-popup';
import update from "../actions/update.js";

class StudentsPage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.students = [];
    this.state = { students: this.students, creating: false, deleting: "" };
  }

  async componentDidUpdate() {
    if (this.state.deleting.length > 1) {
      await this.DeleteStudent(this.state.deleting);
      await this.updStudents();
    }
  }

  async DeleteStudent(id) {
    this.students = await Delete(id);
    console.log(this.students)
    let studentIndex = this.state.students.findIndex(
      (item) => item.id == id
    );
    let tempArray = this.state.students.splice(studentIndex, 1);
    this.setState({ students: tempArray });
    this.setState({ deleting: "" });
    this.setState({
      students: this.students,
    });
  }

  async componentDidMount() {
    this._isMounted = true;
    this.updStudents();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async updStudents() {
    this.students = await read();
    this.setState({
      students: this.students,
    });
  }

  async CreateStudent(name, middle_name, last_name, university, course, birth_date, student_number){
    this.students = await create(
      0,name, middle_name, last_name, university, course, birth_date, student_number
    );

    this.setState({
      students: this.students,
    });

    this.setState({ creating: false });
  }

  async UpdateStudent(id, name, middle_name, last_name, university, course, birth_date, student_number){
    this.students = await update(
      id, name, middle_name, last_name, university, course, birth_date, student_number
    );

    this.setState({
      students: this.students,
    });

    this.setState({ creating: false });
  }

  UserCard = (props) => {
    return (
      <Card>
        <Popup trigger={
          <Info>
            <SubFrame>
              <a>{(props.name + " " + props.middle_name).substr(0, 12) + ((props.name + " " + props.middle_name).length > 12 ?  "..." : "")}</a>
              <SubInfo>
                <a>{props.university}</a>
                <a>{props.curse}</a>
              </SubInfo>
            </SubFrame>
          </Info>
        } 
        modal
        nested
      >
        {close => (
          <div className="modal">
            <div className="header"> {props.name + " " + props.middle_name} </div>
            <div className="content">
              {' '}
              Имя: {props.name} <br />
              Фамилмя: {props.middle_name} <br />
              Отчество: {props.last_name} <br />
              Университет: {props.university} <br />
              Курс: {props.course} <br />
              Дата рождения: {props.birth_date} <br />
              Номер студенческого билета: {props.student_number} <br />
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  console.log('modal closed ');
                  close();
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </Popup>
      <Trash
        onClick={() => {
          this.setState({deleting: props.id });
          this.DeleteStudent(props.id)
        }}
      />
      <Popup trigger={
              <Change />
             }     
      modal
      nested
      >
          {close => (
            <div class="modal">
              <div class="text-field">
                <label class="text-field__label" for="login">
                  Имя
                </label>
                <input
                  class="text-field__input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder={props.name.toString()}
                />
                <label class="text-field__label" for="login">
                  Фамилия
                </label>
                <input
                  class="text-field__input"
                  type="text"
                  name="middle_name"
                  id="middle_name"
                  placeholder={props.middle_name.toString()}
                />
                <label class="text-field__label" for="login">
                  Отчество
                </label>
                <input
                  class="text-field__input"
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder={props.last_name.toString()}
                />
                <label class="text-field__label" for="login">
                  Университет
                </label>
                <input
                  class="text-field__input"
                  type="text"
                  name="university"
                  id="university"
                  placeholder={props.university.toString()}
                />
                <label class="text-field__label" for="login">
                  Номер курса
                </label>
                <input
                  class="text-field__input"
                  type="number"
                  name="course"
                  id="course"
                  min = "1"
                  max = "5"
                  placeholder={props.course.toString()}
                />
                <label class="text-field__label" for="login">
                  Дата рождения
                </label>
                <input
                  class="text-field__input"
                  type="date"
                  placeholder={props.birth_date}
                  name="birth_date"
                  id="birth_date"
                />
                <label class="text-field__label" for="login">
                  Номер студенческого билета
                </label>
                <input
                  class="text-field__input"
                  type="number"
                  maxlength="6"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  name="student_number"
                  id="student_number"
                  placeholder={props.student_number.toString()}
                />
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      this.UpdateStudent(  
                        props.id,    
                        document.getElementById("name").value,
                        document.getElementById("middle_name").value,
                        document.getElementById("last_name").value,
                        document.getElementById("university").value,
                        document.getElementById("course").value.toString(),
                        document.getElementById("birth_date").value.toString(),
                        document.getElementById("student_number").value.toString(),
                      )
                      close();
                    }}
                  >
                    Обновить
                  </button>

                  <button
                    className="button"
                    onClick={() => {
                      this.setState({creating: false})
                      close();
                    }}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </Card>
    );
  };

  OutputListStudents = () => {
    return this.state.students.map((student, index) => (
        <li key={index}>
          {<this.UserCard 
            id={student.id}
            name={student.first_name}
            middle_name={student.middle_name}
            last_name={student.last_name}
            university={student.university}
            course={student.course}
            birth_date={student.birth_date}
            student_number={student.student_number}
            photo={student.photo}
          />}
        </li>
    ));
  };

  render() {
    return (
      <Page>
        <LogoBlock>
          <img src="/images/horizontal_logo.svg" alt=""></img>
        </LogoBlock>
        <StudentsFlex>
          <ul>
            <li>
              <Popup trigger={
               <EmptyStudent>
                <a>Добавить студента</a>
               </EmptyStudent>
              } 
              modal
              nested
              >
                {close => (
                  <div class="modal">
                    <div class="text-field">
                      <label class="text-field__label" for="login">
                        Имя
                      </label>
                      <input
                        class="text-field__input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Иван"
                      />
                      <label class="text-field__label" for="login">
                        Фамилия
                      </label>
                      <input
                        class="text-field__input"
                        type="text"
                        name="middle_name"
                        id="middle_name"
                        placeholder="Иванов"
                      />
                      <label class="text-field__label" for="login">
                        Отчество
                      </label>
                      <input
                        class="text-field__input"
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Иванович"
                      />
                      <label class="text-field__label" for="login">
                        Университет
                      </label>
                      <input
                        class="text-field__input"
                        type="text"
                        name="university"
                        id="university"
                        placeholder="Ярославский государственный университет им. П. Г. Демидова"
                      />
                      <label class="text-field__label" for="login">
                        Номер курса
                      </label>
                      <input
                        class="text-field__input"
                        type="number"
                        name="course"
                        id="course"
                        min = "1"
                        max = "5"
                        placeholder="1"
                      />
                      <label class="text-field__label" for="login">
                        Дата рождения
                      </label>
                      <input
                        class="text-field__input"
                        type="date"
                        value = "2000-08-23"
                        name="birth_date"
                        id="birth_date"
                      />
                      <label class="text-field__label" for="login">
                        Номер студенческого билета
                      </label>
                      <input
                        class="text-field__input"
                        type="text"
                        maxlength="6"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                        name="student_number"
                        id="student_number"
                        placeholder="555555"
                      />
                      <div className="actions">
                        <button
                          className="button"
                          onClick={() => {
                            this.CreateStudent(      
                              document.getElementById("name").value,
                              document.getElementById("middle_name").value,
                              document.getElementById("last_name").value,
                              document.getElementById("university").value,
                              document.getElementById("course").value.toString(),
                              document.getElementById("birth_date").value.toString(),
                              document.getElementById("student_number").value.toString(),
                            )
                            close();
                          }}
                        >
                          Создать
                        </button>

                        <button
                          className="button"
                          onClick={() => {
                            this.setState({creating: false})
                            close();
                          }}
                        >
                          Отмена
                        </button>
                      </div>
                      {/* <button onClick={() => this.setState({creating: false})}>Отмена</button>
                      <button onClick={() => this.CreateStudent()}>Отправить</button> */}
                    </div>
                  </div>
                )}
              </Popup>
            </li>
            <this.OutputListStudents />
          </ul>
        </StudentsFlex>
      </Page>
    );
  }
}

const Page = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 30px;
  ul {
    list-style-type: none;
    margin: 0px 20px 0px 0px;
    padding: 0px;
    column-count: 2;
  }
  li {
    break-inside: avoid;
    margin-bottom: 10px;
  }

  @media (max-width: 800px) {
    width: 100%;
    ul {
      column-count: 1;
      width: 90%;
      margin: 0 auto;
    }

    li {
      width: 100%;
      margin: 0 auto;
    }
  }
`;

const EmptyStudent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  position: static;
  width: 392px;
  height: 105px;
  border-radius: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;

  border-width: 2px;
  border-style: dotted;
  border-color: #7388a8;
  background: white;

  :hover {
    background: #eef8fe;
  }

  a {
    position: relative;
    margin: auto auto;

    font-family: "SF UI Display", Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    text-align: left;

    color: #7388a8;

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  @media (max-width: 800px) {
    width: 90%;
  }
`;

const StudentsFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  margin: 0 auto;
  @media (max-width: 800px) {
    width: 100%;
  }
`;


const LogoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  position: relative;
  width: 800px;
  margin: 0 auto;
  height: 120px;

  background: #ffffff;
  @media (max-width: 800px) {
    width: 100%;
    img {
      margin: 0 auto;
    }
  }
`;

const FormPage = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 30px;

  button {
    width: 150px;
    height: 40px;
    margin-top: 20px;
    background: white;
    border-width: 2px;
    margin-right: 20px;
  border-style: dotted;
  border-color: #7388a8;
  border-radius: 8px;
  font-family: "SF UI Display", Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #7388a8;

  :hover {
    background: #eef8fe;
  }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  input[type="text"] {
    font-family: "SF UI Display", Arial, Helvetica, sans-serif;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
    border-width: 2px;
  border-style: dotted;
  border-color: #7388a8;
  border-radius: 8px;
  }
  .text-field {
    margin-bottom: 1rem;
    font-family: "SF UI Display", Arial, Helvetica, sans-serif;
  }

  .text-field__label {
    display: block;
    margin-bottom: 5px;
    margin-top: 10px;
    font-family: "SF UI Display", Arial, Helvetica, sans-serif;
    color: #7388a8;

  }

  .text-field__input {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-family: "SF UI Display", Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #7388a8;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .text-field__input::placeholder {
    color: #7388a8;
    opacity: 0.4;
  }
  .text-field__input:focus {
    color: #7388a8;
    background-color: #eef8fe;
    border-color: #eef8fe;
    outline: 0;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  position: static;
  width: 392px;
  height: 105px;
  border-radius: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;

  :hover {
    background: #eef8fe;
  }
`;

const Avatar = styled.div`
  position: static;
  width: 80px;
  height: 80px;

  background: center no-repeat url(${({ ava }) => ava});
  object-fit: cover;
  border-radius: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 12px 12px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  position: static;
  width: 284px;
  height: 80px;

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 12px 12px;
`;

const SubFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  position: static;
  width: 212px;
  height: 50px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;

  a {
    position: static;
    width: 212px;
    height: 29px;

    font-family: "SF UI Display";
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    text-align: left;

    color: #333333;

    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

const SubInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: static;
  width: 137px;
  height: 17px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;

  a {
    position: static;
    width: 84px;

    font-family: "SF UI Display";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    color: #7a91b5;

    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px 12px 0px 0px;
  }
`;

const Trash = styled.div`
  position: static;
  width: 24px;
  height: 24px;

  background: url("/images/Trash.svg") no-repeat;
  border-radius: 8px;
  border-color: white;
  opacity: 0.2;

  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 12px 12px;

  :hover {
    opacity: 1;
  }
`;

const Change = styled.div`
  position: static;
  width: 24px;
  height: 24px;

  background: url("/images/write.svg") no-repeat;
  border-radius: 8px;
  border-color: white;
  opacity: 0.2;

  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 12px 12px;

  :hover {
    opacity: 1;
  }
`;



export default StudentsPage;
