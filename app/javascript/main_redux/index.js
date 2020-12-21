import { combineReducers } from 'redux'
import { CourseReducer,
         CommentReducer,
         PageReducer,
         UserReducer,
         UserCourseReducer,
         UserAnswerReducer,
         CertificateReducer,
         TagReducer,
         OrganizationReducer,
         QuestionReducer,
         TheoryReducer,
         RegisteredMemberReducer,
         UnregisteredMemberReducer,
         ImpersonationReducer,
         ReportReducer,
         ErrorReducer} from './reducers'


const Reducer = combineReducers({
  courses: CourseReducer,
  comments: CommentReducer,
  pages: PageReducer,
  users: UserReducer,
  userCourses: UserCourseReducer,
  userAnswers: UserAnswerReducer,
  certificates: CertificateReducer,
  tags: TagReducer,
  organizations: OrganizationReducer,
  questions: QuestionReducer,
  theories: TheoryReducer,
  registered_members: RegisteredMemberReducer,
  unregistered_members: UnregisteredMemberReducer,
  impersonations: ImpersonationReducer,
  reports: ReportReducer,
  errors: ErrorReducer,
});

export default Reducer;
