module RoutesHelper
  def confirmation_url(resource, options = {})
    Rails.logger.debug "[debug(#{__FILE__.split("app/")[1]}:#{__LINE__})] RoutesHelper.confirmation_url ..."
    Rails.logger.debug "[debug(#{__FILE__.split("app/")[1]}:#{__LINE__})] resource: #{resource.inspect}"
    Rails.logger.debug "[debug(#{__FILE__.split("app/")[1]}:#{__LINE__})] options: #{options.inspect}"
  end
end

Rails.application.routes.url_helpers.send(:include, RoutesHelper)
