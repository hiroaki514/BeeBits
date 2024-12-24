# frozen_string_literal: true

module Api
  class BaseController < ActionController::API
    # API コントローラに共通する設定をここに記述
    before_action :authenticate_user!
    
    # JSONリクエストのみ許可
# before_action :ensure_json_request

# def ensure_json_request
#   unless request.format.json?
#     render json: { error: 'Unsupported format' }, status: :not_acceptable
#   end
# end

  end
end
