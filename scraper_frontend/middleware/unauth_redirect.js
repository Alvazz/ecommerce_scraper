export default ({ $auth, redirect }) => {
  if ($auth.$state.loggedIn) {
    return redirect('/');
  }
}
