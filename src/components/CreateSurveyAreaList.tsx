import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import Visibility from "material-ui/svg-icons/action/visibility";
import VisibilityOff from "material-ui/svg-icons/action/visibility-off";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import QuestionOptions from "./AnswerOption";
import {
    changeQuestionType,
    deleteArea,
    chooseArea,
    updateDescriptionArea,
    updateInfoSurvey,
    changeQuestionDetail,
} from "./redux/actionCreators";

interface IAreaList {
    surveyData: any;
    currentArea: number;
    chooseArea: (index: number) => any;
    deleteArea: (index: number) => any;
    changeQuestionType: (index: number, questionType: string) => any;
    updateDescriptionArea: (index: number, field: string, value: string) => any;
    changeQuestionDetail: (index: number, value: string, multipleDropdownId?: number) => any;
}

const CreateSurveyAreaList: React.SFC<IAreaList> = props => {
    const { surveyData, currentArea, chooseArea, deleteArea, changeQuestionType, updateDescriptionArea, changeQuestionDetail } = props;
    let indexQuestion = 0;
    return (
        <div>
            {surveyData.contents.map((area: any, index: any) => {
                console.log(area);
                
                let classActive = index === currentArea ? "active-area" : "";
                if (area.type === "question") {
                    indexQuestion += 1;
                    classActive += " form-question";
                    return (
                        <div key={index} className={classActive} onClick={e => chooseArea(index)}>
                            <div>
                                <div className="delete-area" onClick={e => deleteArea(index)}>
                                    <i className="fa fa-times" />
                                </div>
                            </div>
                            <TextField
                                name="question_text"
                                hintText=""
                                fullWidth={true}
                                value={surveyData.contents[index].question}
                                onChange={(e: any) => changeQuestionDetail(index, e.target.value)}
                                floatingLabelText={`Question ${indexQuestion}`}
                            />
                            <SelectField
                                floatingLabelText="Answer"
                                fullWidth={true}
                                value={area.questionType}
                                onChange={(event: object, key: number, payload: any) => {
                                    changeQuestionType(index, payload);
                                }}
                                className="mui-select"
                            >
                                <MenuItem value="shortQuestion" label="Short answer">
                                    Short answer
                                </MenuItem>
                                <MenuItem value="longQuestion" label="Long answer">
                                    Long answer
                                </MenuItem>
                                <MenuItem value="checkbox" label="Checkbox">
                                    Checkbox
                                </MenuItem>
                                <MenuItem value="multipleChoices" label="Multiple choices">
                                    Multiple choices
                                </MenuItem>
                                <MenuItem value="dropdown" label="Dropdown">
                                    Dropdown
                                </MenuItem>
                                <MenuItem value="multipleDropdown" label="Multiple dropdown">
                                    Multiple dropdown
                                </MenuItem>
                                <MenuItem value="priority" label="Priority">
                                    Priority
                                </MenuItem>
                            </SelectField>
                            <QuestionOptions area={area} index={index} />
                        </div>
                    );
                }
                if (area.type === "description") {
                    classActive += " form-info";
                    return (
                        <div key={index} className={classActive} onClick={e => chooseArea(index)}>
                            <div>
                                <div className="delete-area" onClick={e => deleteArea(index)}>
                                    <i className="fa fa-times" />
                                </div>
                            </div>
                            <div className="form-title">
                                <TextField
                                    name="question_text"
                                    hintText=""
                                    fullWidth={true}
                                    onChange={(e: any) => updateDescriptionArea(index, "title", e.target.value)}
                                    floatingLabelText="Title"
                                />
                            </div>
                            <div className="form-description">
                                <TextField
                                    name="question_text"
                                    hintText=""
                                    fullWidth={true}
                                    onChange={(e: any) => updateDescriptionArea(index, "description", e.target.value)}
                                    floatingLabelText="Description"
                                />
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    surveyData: state.surveyData,
});

const mapDispatchToProps = (dispatch: any) => ({
    changeQuestionType: (index: number, questionType: string) => dispatch(changeQuestionType(index, questionType)),
    deleteArea: (index: number) => dispatch(deleteArea(index)),
    chooseArea: (index: number) => dispatch(chooseArea(index)),
    updateDescriptionArea: (index: number, field: string, value: string) => dispatch(updateDescriptionArea(index, field, value)),
    changeQuestionDetail: (index: number, value: string) => dispatch(changeQuestionDetail(index, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateSurveyAreaList);
