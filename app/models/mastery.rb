class Mastery < ActiveRecord::Base
  belongs_to :dnd_class
  belongs_to :spell
end
