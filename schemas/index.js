import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connect = () => {
  //.env 환경변수 사용을 위한 dotenv 패키지
  dotenv.config();
  // mongoose.connect는 MongoDB 서버에 연결하는 메서드입니다.
  mongoose
    .connect(process.env.DATABASE_URL, {
      dbName: 'game_simulator', // 데이터베이스명
    })
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

export default connect;
