export  async function postsUser(req, res) {
    const activeUser = res.locals.activeUser
  
    res.send(activeUser);
  }