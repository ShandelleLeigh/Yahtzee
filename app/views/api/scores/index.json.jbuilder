json.array! @scores do |score|
  user = User.find(score.user_id)
  json.id score.id
  json.email user.email
  json.nickname user.nickname
  json.score score.value
  json.created_at score.created_at
  # this shows everything that you want to show
  # on the score board
end
