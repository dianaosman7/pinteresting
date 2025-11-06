require "test_helper"

class Home2ControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get home2_index_url
    assert_response :success
  end
end
