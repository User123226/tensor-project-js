import styled from "styled-components";

const FirstPage = (props) => {
  return (
    <Splash onClick={() => window.open("/students")}>
      <LogoFrame>
        <Container>
          <img src="/images/Desktop logo 272_134.png" alt=""></img>
        </Container>
      </LogoFrame>
      <DownBlock>
        <img src="/images/coworkers.svg" alt=""></img>
        <a>
          <h1>
            Это страница школы Тензор. Тут вы можете познакомиться с нашими
            учениками и посмотреть темы занятий.
          </h1>
        </a>
      </DownBlock>
    </Splash>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;

  position: static;
  width: 271px;
  height: 134px;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 16px 0px;

  
  a {
    position: static;
    width: 400px;
    height: 47px;

    font-family: TensorFont, Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 47px;
    text-align: center;

    color: #333333;
  }
`;

const Splash = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;

  position: relative;
  width: 800px;
  height: 618px;
  margin-left: auto;
  margin-right: auto;

  background: #ffffff;
`;

const LogoFrame = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;

  position: relative;
  width: 565px;
  height: 134px;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 80px 0px;
`;

const DownBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;

  position: static;
  width: 526px;
  height: 404px;

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 20px 0px;

  img {
    position: relative;
    width: 294px;
    height: 251px;

    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 64px auto;
  }

  a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;

    position: static;
    width: 526px;
    height: 89px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 64px 0px;

    h1 {
      position: relative;
      width: 526px;
      height: 69px;

      font-family: "SF UI Display", Helvetica, Arial, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 23px;
      text-align: center;

      color: #333333;

      flex: none;
      order: 0;
      flex-grow: 0;
      margin: 0px 10px;
    }
  }
`;

export default FirstPage;
