module.exports = {
  // При запросе разрешается информация об авторе заметки
  author: async (note, args, { models }) => {
    return await models.User.findById(note.author);
  },
  // При запросе разрешается информация favoritedBy для заметки
  favoritedBy: async (note, arg, { models }) => {
    return await models.User.find({ _id: { $in: note.favoritedBy } });
  }
};
