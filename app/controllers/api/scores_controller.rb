class Api::ScoresController < ApplicationController
  before_action :authenticate_user!

  def index
    # make a file with same name:  index.json.jbuilder,
      #since this is a controller, by default it'll look for
      #file of same name
    @scores = Score.all.order(value: :desc)
  end
  # orders scores ind descending value,  on score board

  def create
    score = current_user.scores.new(score_params)

    if score.save
      render json: score
    else
      render json: { errors: score.errors.join(',') }, status: 422
    end
  end

  private
    def score_params
      # { score: { value: 100} }
      params.require(:score).permit(:value)
    end
end
