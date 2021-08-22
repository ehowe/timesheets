namespace :assets do
  task clobber: :environment do
    webpacker_config = YAML.load_file(Rails.root.join("config", "webpacker.yml"))
    assets_path      = webpacker_config[Rails.env]["public_output_path"]

    FileUtils.rm_rf(Dir.glob(Rails.root.join("public", assets_path, "*")))
  end
end
