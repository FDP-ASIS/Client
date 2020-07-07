import * as React from 'react';
import Strings from '../../utils/strings';
import {
	Alignment,
	Button,
	Classes,
	FormGroup,
	H2,
	H3,
	H5,
	IconName,
	InputGroup,
	Intent,
	Overlay,
	Spinner,
	Toaster,
	Tooltip,
} from '@blueprintjs/core';
import { UserApi } from '../../api/user';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import classNames from 'classnames';
import { User } from '../../models/user';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/user';
import profPic from '../../assets/profile.png';

export interface Props {
	children?: React.ReactNode;
	user: User;
}

export interface State {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
	loading: boolean;
	OverlayIsOpen: boolean;
	showPasswordCurrent: boolean;
	showPasswordNew: boolean;
	showPasswordConfirm: boolean;
	isOpenError: boolean;
	disabled: boolean;
	user: User;
	intentNew: Intent;
	intentConfirm: Intent;
	intentCurrent: Intent;
	equalPassword: boolean;
}

const OVERLAY_CLASS = 'overlay-transition';

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Center = styled(H2)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin: auto;
	flex-grow: 1;
	text-align: center;
`;

const H5Color = styled(H5)`
	color: navy;
`;

const H3Align = styled(H3)`
	text-align: center;
`;

const Logo = styled.img<{ src: string }>`
	src: ${(props) => props.src};
	alt: 'logo';
	width: 80px;
	height: 80px;
`;

const ProfileHelper: React.FunctionComponent = () => {
	const user = useSelector(selectUser);
	return <Profile user={user!} />;
};

export default ProfileHelper;

class Profile extends React.Component<Props, State> {
	userApi: UserApi;

	constructor(props: Props) {
		super(props);
		this.userApi = new UserApi();
		this.state = {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
			loading: false,
			OverlayIsOpen: false,
			showPasswordCurrent: false,
			showPasswordNew: false,
			showPasswordConfirm: false,
			disabled: false,
			isOpenError: false,
			user: props.user,
			intentNew: Intent.NONE,
			intentConfirm: Intent.NONE,
			intentCurrent: Intent.NONE,
			equalPassword: false,
		};
	}

	private toaster: Toaster | undefined;

	private handleLockClick1 = () =>
		this.setState({ showPasswordCurrent: !this.state.showPasswordCurrent });
	private handleLockClick2 = () =>
		this.setState({ showPasswordNew: !this.state.showPasswordNew });
	private handleLockClick3 = () =>
		this.setState({ showPasswordConfirm: !this.state.showPasswordConfirm });

	private isNewPasswordValid = (event: React.FormEvent<HTMLInputElement>) => {
		if (event.currentTarget.value.length < 5 || event.currentTarget.value.length > 15)
			this.setState({ intentNew: Intent.DANGER, newPassword: event.currentTarget.value });
		else this.setState({ intentNew: Intent.SUCCESS, newPassword: event.currentTarget.value });
	};

	private isCurrentPasswordValid = (event: React.FormEvent<HTMLInputElement>) => {
		if (event.currentTarget.value.length < 5 || event.currentTarget.value.length > 15)
			this.setState({
				intentCurrent: Intent.DANGER,
				currentPassword: event.currentTarget.value,
			});
		else
			this.setState({
				intentCurrent: Intent.SUCCESS,
				currentPassword: event.currentTarget.value,
			});
	};

	private isPasswordMatch = (newPassword: string, event: React.FormEvent<HTMLInputElement>) => {
		if (event.currentTarget.value.length < 5 || event.currentTarget.value.length > 15)
			this.setState({
				intentConfirm: Intent.DANGER,
				confirmPassword: event.currentTarget.value,
				equalPassword: false,
			});
		else {
			if (newPassword != event.currentTarget.value)
				this.setState({
					intentConfirm: Intent.DANGER,
					confirmPassword: event.currentTarget.value,
					equalPassword: false,
				});
			else
				this.setState({
					intentConfirm: Intent.SUCCESS,
					confirmPassword: event.currentTarget.value,
					equalPassword: true,
				});
		}
	};

	private onSubmit = (
		currentPassword: string,
		newPassword: string,
		confirmPassword: string,
		equalPassword: boolean
	) => {
		if (!currentPassword && !newPassword && !confirmPassword) {
			this.addToast(Strings.FILL_ALL_FIELDS, Intent.DANGER, 'error');
			this.setState({
				intentConfirm: Intent.DANGER,
				intentCurrent: Intent.DANGER,
				intentNew: Intent.DANGER,
			});
		} else if (!currentPassword || !newPassword || !confirmPassword) {
			this.addToast(Strings.FILL_ALL_FIELDS, Intent.DANGER, 'error');
		} else {
			if (!equalPassword) this.addToast(Strings.PASSWORD_NOT_MATCHED, Intent.DANGER, 'error');
			else {
				this.userApi
					.updatePassword(this.state.user.id, currentPassword, newPassword)
					.then(() => {
						this.closeOverlay();
						this.addToast(Strings.PASSWORD_CHANGED, Intent.SUCCESS, 'updated');
						this.setState({
							currentPassword: '',
							newPassword: '',
							confirmPassword: '',
						});
					})
					.catch((error) => {
						console.log(error);
						this.addToast(Strings.WRONG_CURRENT_PASSWORD, Intent.DANGER, 'error');
					});
			}
		}
	};

	private addToast = (reason: string, color: Intent, icon: IconName) => {
		if (this.toaster) this.toaster.show({ message: reason, intent: color, icon: icon });
	};

	closeOverlay = () => {
		this.setState({
			OverlayIsOpen: false,
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
			intentNew: 'none',
			intentConfirm: 'none',
		});
	};

	LockButton = ({ showPassword, onClick }: { showPassword: any; onClick: any }) => {
		return (
			<Tooltip
				content={`${showPassword ? Strings.HIDE : Strings.SHOW} ${Strings.PASSWORD}`}
				disabled={this.state.disabled}
			>
				<Button
					disabled={this.state.disabled}
					icon={showPassword ? 'eye-open' : 'eye-off'}
					intent={Intent.WARNING}
					minimal
					onClick={onClick}
				/>
			</Tooltip>
		);
	};

	render() {
		const {
			loading,
			OverlayIsOpen,
			currentPassword,
			newPassword,
			confirmPassword,
			showPasswordCurrent,
			showPasswordNew,
			showPasswordConfirm,
			disabled,
		} = this.state;

		const classes = classNames(Classes.CARD, Classes.ELEVATION_4, OVERLAY_CLASS);

		const lockButton1 = (
			<this.LockButton showPassword={showPasswordCurrent} onClick={this.handleLockClick1} />
		);
		const lockButton2 = (
			<this.LockButton showPassword={showPasswordNew} onClick={this.handleLockClick2} />
		);
		const lockButton3 = (
			<this.LockButton showPassword={showPasswordConfirm} onClick={this.handleLockClick3} />
		);

		return (
			<>
				<Toaster
					position="top"
					canEscapeKeyClear={true}
					maxToasts={1}
					ref={(ref: Toaster) => (this.toaster = ref)}
				/>
				<Overlay isOpen={OverlayIsOpen} usePortal>
					<div className={classes} style={{ color: 'black' }}>
						{
							<>
								<Row>
									<Col span={10}>
										<H3 style={{ marginBottom: '20px' }}>
											{' '}
											{Strings.CHANGE_PASSWORD}{' '}
										</H3>
									</Col>
									<Col span={6} offset={8} style={{ marginBottom: '5%' }}>
										<div style={{ marginBottom: '10%' }} />
									</Col>
								</Row>
								<Row gutter={[20, 16]}>
									<Col span={6}>{Strings.CURRENT_PASSWORD}:</Col>
									<Col span={16}>
										<FormGroup
											intent={Intent.PRIMARY}
											helperText={Strings.PASSWORD_LENGTH}
										>
											<InputGroup
												value={currentPassword}
												placeholder={Strings.CURRENT_PASSWORD}
												disabled={disabled}
												rightElement={lockButton1}
												type={showPasswordCurrent ? 'text' : 'password'}
												minLength={5}
												maxLength={15}
												intent={this.state.intentCurrent}
												onChange={(
													event: React.FormEvent<HTMLInputElement>
												) => {
													this.isCurrentPasswordValid(event);
												}}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row gutter={[20, 16]}>
									<Col span={6}>{Strings.SET_NEW_PASSWORD}:</Col>
									<Col span={16}>
										<FormGroup
											intent={Intent.PRIMARY}
											helperText={Strings.PASSWORD_LENGTH}
										>
											<InputGroup
												value={newPassword}
												placeholder={Strings.SET_NEW_PASSWORD}
												disabled={disabled}
												rightElement={lockButton2}
												type={showPasswordNew ? 'text' : 'password'}
												minLength={5}
												maxLength={15}
												intent={this.state.intentNew}
												onChange={(
													event: React.FormEvent<HTMLInputElement>
												) => {
													this.isNewPasswordValid(event);
												}}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row gutter={[20, 16]}>
									<Col span={6}>{Strings.CONFIRM_PASSWORD}:</Col>
									<Col span={16}>
										<FormGroup
											intent={Intent.PRIMARY}
											helperText={Strings.PASSWORD_LENGTH}
										>
											<InputGroup
												value={confirmPassword}
												placeholder={Strings.CONFIRM_PASSWORD}
												disabled={disabled}
												rightElement={lockButton3}
												type={showPasswordConfirm ? 'text' : 'password'}
												minLength={5}
												maxLength={15}
												intent={this.state.intentConfirm}
												onChange={(
													event: React.FormEvent<HTMLInputElement>
												) => {
													this.isPasswordMatch(
														this.state.newPassword,
														event
													);
												}}
											/>
										</FormGroup>
									</Col>
								</Row>
								<div
									style={{
										height: '50%',
									}}
								>
									{loading ? (
										<Center style={{ zIndex: 1 }}>
											<Spinner />
										</Center>
									) : null}
								</div>
							</>
						}
						<div
							className={Classes.DIALOG_FOOTER_ACTIONS}
							style={{ marginTop: '20px' }}
						>
							<Button
								intent={Intent.DANGER}
								disabled={loading}
								onClick={() => this.closeOverlay()}
								style={{ margin: '' }}
							>
								{Strings.CLOSE}
							</Button>
							<Button
								disabled={loading}
								intent={Intent.PRIMARY}
								style={{ margin: '' }}
								onClick={() =>
									this.onSubmit(
										this.state.currentPassword,
										this.state.newPassword,
										this.state.confirmPassword,
										this.state.equalPassword
									)
								}
							>
								{Strings.SAVE}
							</Button>
						</div>
					</div>
				</Overlay>
				<FillAllPage>
					<H3Align>{Strings.MY_PROFILE}</H3Align>
					<Row gutter={[6, 6]}>
						<Col span={16}>
							<div style={{ marginTop: '25%' }}>
								<>
									<Row>
										<Col span={10}>
											<H5Color>{Strings.ID}</H5Color>
										</Col>
										<Col span={10}>
											<InputGroup
												value={this.props.user.id}
												disabled={true}
											/>
										</Col>
									</Row>
									<div style={{ marginTop: '10px' }}>
										<Row>
											<Col span={10}>
												<H5Color>{Strings.USERNAME}</H5Color>
											</Col>
											<Col span={10}>
												<InputGroup
													value={this.props.user.username}
													disabled={true}
												/>
											</Col>
										</Row>
									</div>

									<div style={{ marginTop: '10px' }}>
										<Row>
											<Col span={10}>
												<H5Color>{Strings.FIRST_NAME_PROFILE}</H5Color>
											</Col>
											<Col span={10}>
												<InputGroup
													value={this.props.user.name.first}
													disabled={true}
												/>
											</Col>
										</Row>
									</div>

									<div style={{ marginTop: '10px' }}>
										<Row>
											<Col span={10}>
												<H5Color>{Strings.LAST_NAME_PROFILE}</H5Color>
											</Col>
											<Col span={10}>
												<InputGroup
													value={this.props.user.name.last}
													disabled={true}
												/>
											</Col>
										</Row>
									</div>

									<div style={{ marginTop: '10px' }}>
										<Row>
											<Col span={10}>
												<H5Color>{Strings.EMAIL}</H5Color>
											</Col>
											<Col span={10}>
												<InputGroup
													value={this.props.user.email}
													disabled={true}
												/>
											</Col>
										</Row>
									</div>
									<div style={{ marginTop: '10px' }}>
										<Row>
											<Col span={10}>
												<H5Color>{Strings.ROLE}</H5Color>
											</Col>
											<Col span={10}>
												<InputGroup
													value={this.props.user.role}
													disabled={true}
												/>
											</Col>
										</Row>
									</div>
									<div
										style={{
											display: 'flex',
											marginTop: '90px',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Logo src={profPic}></Logo>
									</div>
								</>
							</div>
						</Col>
						<Col span={8}>
							<div style={{ marginTop: '10%' }}>
								<Button
									intent={Intent.WARNING}
									alignText={Alignment.LEFT}
									rightIcon={'edit'}
									fill={true}
									disabled={loading}
									text={Strings.EDIT_PROFILE}
									onClick={() =>
										this.setState({
											OverlayIsOpen: true,
										})
									}
								/>
							</div>
						</Col>
					</Row>
				</FillAllPage>
			</>
		);
	}
}
