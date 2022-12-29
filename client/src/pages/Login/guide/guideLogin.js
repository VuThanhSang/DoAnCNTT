import classNames from 'classnames/bind';
import styles from './guideLogin.module.scss';

const cx = classNames.bind(styles);
function GuideLogin() {
    return (
        <div className={cx('wrapper')}>
            <h3>
                <strong>Hướng dẫn đăng nhập :</strong>
            </h3>
            <img src="login.png" alt="BigCo Inc. logo" />
            <p>Ở đây sẽ có 2 loại login</p>
            <p>
                Đầu tiên sẽ là login của Giảng viên :
                <strong> ở đây sẽ sử dụng tài khoản mật khẩu để đăng ký vô hệ thống </strong>
            </p>
            <p>
                <strong>
                    tài khoản mật khẩu này có thể được tạo bằng cách bấm vào nút đăng ký tài khoản ở bển dưới
                </strong>
            </p>
            <hr />
            <p>
                Sau khi đăng nhập thành công cho <strong> Giảng viên :</strong>
            </p>
            <img src="lecture.png" alt="BigCo Inc. logo" />

            <p>
                Tiếp đến sẽ là phần login của sinh viên :
                <strong>Sinh viên sẽ login qua tài khoản gmail bằng cách bấm vào biệu tượng google bên dưới </strong>
            </p>
            <img src="studentLogin.png" alt="BigCo Inc. logo" />
            <p>
                Quản trị tài khoản : Sinh viên xem thông báo về phép được đăng ký đề tài trong lần này không, thay đổi
                thông tin hoặc mật khẩu.
            </p>
            <ul>Đăng ký đề tài :</ul>
            <ul>
                <li>
                    Nếu bạn chưa đăng ký đề tài nào thì hệ thống hiện ra danh sách các đề tài mà bạn có thể đăng ký, bạn
                    chọn đề tài nào thì nhấp vào link Đăng ký đề tài đó{' '}
                </li>
                <br />
                <li>
                    Nếu đề tài bạn muốn đăng ký đã có người đăng ký trước rồi thì bạn chọn vào link XVN (xin vào nhóm:
                    để thêm mình vào danh sách “Quan tâm đề tài”) hoặc click gửi mail để gửi yêu cầu trực tiếp đến email
                    trưởng nhóm đề tài. Ngoài ra bạn có thể xem thông tin liên lạc của nhóm trưởng thông qua “Chi tiết
                    đề tài”.
                </li>
                <br />
                <li>
                    Nếu bạn đăng ký đề tài và là trưởng nhóm thì bạn được quyền xem danh sách các sinh viên “Quan tâm đề
                    tài” và có thể thêm các thành viên này (hoặc bất cứ sinh viên nào được phép đăng ký đề tài) vào nhóm
                    với điều kiện đề tài của bạn còn chỗ trống.
                </li>
                <br />
                <li>
                    Đề tài có ràng buộc chuyên ngành thì Nhóm trưởng phải thêm các thành viên theo đúng chuyên ngành của
                    đề tài. Mỗi đợt đăng ký đề tài có giới hạn thời gian bắt đầu và thời gian kết thúc, khi hết thời
                    gian đăng ký thì bạn không thể vào chức năng Đăng ký đề tài nữa mà chỉ có thể tìm kiếm các thông tin
                    chung của các đề tài.
                </li>
            </ul>
            <p>
                Mỗi đợt đăng ký đề tài có giới hạn thời gian bắt đầu và thời gian kết thúc, khi hết thời gian đăng ký
                thì bạn không thể vào chức năng Đăng ký đề tài nữa mà chỉ có thể tìm kiếm các thông tin chung của các đề
                tài.
            </p>
        </div>
    );
}

export default GuideLogin;
