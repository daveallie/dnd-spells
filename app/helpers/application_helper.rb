# frozen_string_literal: true

module ApplicationHelper
  def s3_asset_url(asset_name)
    '/' + asset_name
  end
end
